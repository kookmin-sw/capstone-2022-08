import argparse
import os
from typing import Any, Dict, List, Tuple

import numpy as np
import torch
from datasets import load_dataset
from sklearn.metrics import classification_report
from torch.nn.utils.rnn import pad_sequence
from torch.optim import Adam
from torch.utils.data import DataLoader, Dataset
from transformers import AutoTokenizer, PreTrainedTokenizerFast, RobertaForSequenceClassification

# fmt: off
parser = argparse.ArgumentParser()
parser.add_argument("--pretrained-model-name", type=str, default="jason9693/soongsil-bert-small", help="사전학습 모델 경로")
parser.add_argument("--output-dir", type=str, default="artifacts/", help="결과물 출력 폴더")
parser.add_argument("--batch-size", type=str, default=32)
parser.add_argument("--num-epochs", type=int, default=2)
# fmt: on


class AbusingDataset(Dataset):
    def __init__(
        self,
        data_list: List[Dict[str, Any]],
        tokenizer: PreTrainedTokenizerFast,
        max_length: int = 64,
    ):
        self.data_list = data_list
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self) -> int:
        return len(self.data_list)

    def __getitem__(self, index: int):
        data = self.data_list[index]
        tokenized_text = self.tokenizer(
            data["text"],
            max_length=self.max_length,
            truncation=True,
            return_tensors="pt",
        )
        label = torch.tensor(data["label"])
        return (tokenized_text.input_ids.squeeze(0), tokenized_text.attention_mask.squeeze(0), label)


def collate_fn(inputs: List[Tuple[torch.Tensor, torch.Tensor, torch.Tensor]]):
    padded_input_ids = pad_sequence([input_ids for input_ids, _, _ in inputs]).transpose(0, 1)
    padded_attention_mask = pad_sequence([attention_mask for _, attention_mask, _ in inputs]).transpose(0, 1)
    labels = torch.stack([label for _, _, label in inputs])
    return padded_input_ids, padded_attention_mask, labels


def main(args: argparse.Namespace):
    device = torch.device("cuda")

    tokenizer = AutoTokenizer.from_pretrained(args.pretrained_model_name)
    model = RobertaForSequenceClassification.from_pretrained(args.pretrained_model_name)
    model = model.to(device)

    kor_hate_dataset = load_dataset("kor_hate")
    kor_unsmile_dataset = load_dataset("smilegate-ai/kor_unsmile")

    train_rows = []
    for data in kor_hate_dataset["train"]:
        text = data["comments"]
        is_bad = data["contain_gender_bias"] or data["bias"] != 0 or data["hate"] != 2
        train_rows.append({"text": text, "label": int(is_bad)})
    for data in kor_unsmile_dataset["train"]:
        text = data["문장"]
        is_bad = not bool(data["clean"])
        train_rows.append({"text": text, "label": int(is_bad)})

    test_rows = []
    for data in kor_hate_dataset["test"]:
        text = data["comments"]
        is_bad = data["contain_gender_bias"] or data["bias"] != 0 or data["hate"] != 2
        test_rows.append({"text": text, "label": int(is_bad)})
    for data in kor_unsmile_dataset["valid"]:
        text = data["문장"]
        is_bad = not bool(data["clean"])
        test_rows.append({"text": text, "label": int(is_bad)})

    train_dataset = AbusingDataset(train_rows, tokenizer)
    train_dataloader = DataLoader(train_dataset, batch_size=args.batch_size, collate_fn=collate_fn, shuffle=True)

    eval_dataset = AbusingDataset(test_rows, tokenizer)
    eval_dataloader = DataLoader(eval_dataset, batch_size=args.batch_size, collate_fn=collate_fn, shuffle=True)

    optimizer = Adam(model.parameters(), lr=1e-5)
    global_step = 0
    total_steps = len(train_dataloader) * args.num_epochs
    interval_loss = []
    interval_corrects = []

    for epoch in range(args.num_epochs):
        for inputs in train_dataloader:
            input_ids, attention_mask, labels = (tensor.to(device) for tensor in inputs)
            model_output = model(input_ids, attention_mask, labels=labels)

            model.zero_grad()
            model_output.loss.backward()
            optimizer.step()

            if global_step > 0 and global_step % 100 == 0:
                avg_loss = torch.mean(torch.stack(interval_loss))
                avg_acc = np.mean(interval_corrects)
                print(f"epoch: {epoch} step: {global_step}/{total_steps} loss: {avg_loss} acc: {avg_acc}")
                interval_loss.clear()
                interval_corrects.clear()

            global_step += 1
            interval_loss.append(model_output.loss)
            interval_corrects.extend(model_output.logits.argmax(-1).eq(labels).long().tolist())

        with torch.inference_mode():
            eval_probs, eval_results, eval_labels = [], [], []
            for eval_batch in eval_dataloader:
                input_ids, attention_mask, labels = (tensor.to(device) for tensor in eval_batch)
                model_output = model(input_ids, attention_mask, labels=labels)
                bad_probs = torch.softmax(model_output.logits, dim=-1)[:, 1].tolist()
                is_bads = model_output.logits.argmax(-1).tolist()
                eval_probs.extend(bad_probs)
                eval_results.extend(is_bads)
                eval_labels.extend(labels.tolist())

        print(classification_report(eval_labels, eval_results))

        eval_path = os.path.join(args.output_dir, f"eval.{epoch}.tsv")
        with open(eval_path, "w") as f:
            for text, prob, is_bad in zip(test_rows, eval_probs, eval_results):
                f.write(f"{text}\t{prob}\t{is_bad}\n")

        model_path = os.path.join(args.output_dir, f"model.{epoch}.pt")
        torch.save(model.state_dict(), model_path)


if __name__ == "__main__":
    main(parser.parse_args())

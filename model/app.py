import torch
from fastapi import FastAPI
from pydantic import BaseModel, BaseSettings
from transformers import AutoConfig, AutoTokenizer, RobertaForSequenceClassification


class ModelServerSettings(BaseSettings):
    pretrained_model_name: str = "jason9693/soongsil-bert-small"
    model_path: str = "/models/model.pt"
    max_sequence_length: int = 128


settings = ModelServerSettings()
app = FastAPI()

tokenizer = AutoTokenizer.from_pretrained(settings.pretrained_model_name)
config = AutoConfig.from_pretrained(settings.pretrained_model_name)
model = RobertaForSequenceClassification(config)
model.load_state_dict(torch.load(settings.model_path, map_location="cpu"))
model.eval()


class PredictRequest(BaseModel):
    text: str


@app.post("/predict")
async def predict(payload: PredictRequest):
    model_inputs = tokenizer.batch_encode_plus(
        [payload.text],
        max_length=settings.max_sequence_length,
        truncation=True,
        return_tensors="pt",
    )
    model_output = model(model_inputs.input_ids, model_inputs.attention_mask)
    bad_prob = torch.softmax(model_output.logits, dim=-1)[0][1].item()
    is_bad = bad_prob > 0.5
    return {"is_bad": is_bad, "bad_prob": bad_prob}

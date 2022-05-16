let senderButton = document.getElementById("sendButton");
let resultText = document.getElementById("percentageText");
let targetSentence = document.getElementById("chat");
let emojiText = document.getElementById("resultEmoji");

senderButton.addEventListener('click', function() {
    axios.post('http://3.39.104.73:1366/predict', {
            "text": targetSentence.value
        })
        .then(function(response) {
            let percentage = parseInt(response.data["bad_prob"]*100);
            if (response.data["is_bad"]) {
                emojiText.textContent = "😭";
            } else {
                emojiText.textContent = "😆";
            }
            resultText.textContent = percentage.toString();
        })
        .catch(function(error) {
            alert(error);
        });
});
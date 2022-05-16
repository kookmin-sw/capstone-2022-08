require("dotenv").config();

const axios = require('axios');
const tmi = require('tmi.js');

const options = {
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [
        process.env.TWITCH_BOT_CHANNEL
    ],
    connection: {
        reconnect: true,
        secure: true
    }
};

const tmiClient = new tmi.client(options);

tmiClient.on('message', onMessageHandler);

tmiClient.on('connected', function() {
    console.log("Connected on tmi");
});

function onMessageHandler(target, context, msg, self) {
    if (self) { return; }

    console.log(`received message: ${msg}`);
    messageID = context["id"]
    axios.post('http://3.39.104.73:1366/predict', {
            "text": msg
        })
        .then(function (response) {
            let isBadHorse = response.data["is_bad"];
            let percentage = parseInt(response.data["bad_prob"] * 100);
            tmiClient.say(target, `${percentage}%`);
            if (isBadHorse) {
                deleteMessageByID(messageID);
            }
        })
        .catch(function (error) {
            console.log(`response error: ${error}`);
        })
}

function deleteMessageByID(messageID) {
    tmiClient.deletemessage(process.env.TWITCH_BOT_CHANNEL, messageID)
        .then((data) => {
            console.log(data);
            console.log(`delete ${messageID}`);
        }).catch((err) => {
            console.log(err);
        });
}

tmiClient.connect(options);

const REGION = 'asia-northeast1';
const functions = require('firebase-functions');
const request = require('request-promise');
const { push_update_status, reply_track, reply_text, gettrack, settrack} = require('./track')

exports.patrickWebHook = functions.region(REGION).https.onRequest((req, res) => {
    console.log('Start Webhook');   
    push_update_status(req);
    res.status(200).send("OK").end();
});


exports.patrickLineBot = functions.region(REGION).https.onRequest((req, res) => {
    if (req.body.events[0].message.type == 'text') {
        
        let message = req.body.events[0].message.text;
        let command = message.split(' ');
        if(command[0].toLowerCase() == 'set' ) {
            if(command.length > 1) {
                settrack(req, command[1]);
            }
        } else {
            gettrack(req, message);
        }

    } else {
        reply_text(req, JSON.stringify(req.body) );
    }
});

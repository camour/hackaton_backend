let push = require('web-push');
const subscriptions = {};
const fetch = require('cross-fetch');

const vapidKeys = {
    publicKey: 'BIp2B5Iwb-uy3RLwo8E5RJwRW2CYv16g5ip3Y4zoGr9fHEGl4MAQbkkU_1wGyJS6ZzZPxe3KjgPSAvPs__mwoRM',
    privateKey: 'T_khU9BUNLDt7x-DKxBi8gG09g_j_L68qcTKDapLLSQ'
};
push.setVapidDetails('http://localhost:8008', vapidKeys.publicKey, vapidKeys.privateKey);

exports.handleWebClientSubscription = (request, response, next) => {
    console.log(request.body);
    subscriptions[0] = {...request.body};
    response.status(201).json({message: 'server : subscription registered !'});
};

exports.sendNotificationToWebClient = (request, response, next) => {
    push.sendNotification(subscriptions[0].push, 'notification test');
    response.status(200).json({message: 'notification sent'});
    fetch('http://localhost:8282/~/mn-cse/cnt-863604642', {
        method: 'POST',
        headers: {
            'X-M2M-Origin': 'admin:admin',
            'Content-Type': 'application/json;ty=23',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
                "m2m:sub": {
            
                  "nu": "http://localhost:3000/onem2m",
            
                  "nct": 2,
            
                  "rn": "SUB_DATA_CHAMBRE_1"
            
                }            
        })
    })
    .then(result => {
        if(result.ok){
            console.log('result : ');
            console.log(result);
            return result.json();
        }
    })
    .then(result => {
        console.log('result.json() :')
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
};


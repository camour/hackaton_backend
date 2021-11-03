let push = require('web-push');
const subscriptions = {};
const tools = require('../onem2m/tools');

const vapidKeys = {
    publicKey: 'BIp2B5Iwb-uy3RLwo8E5RJwRW2CYv16g5ip3Y4zoGr9fHEGl4MAQbkkU_1wGyJS6ZzZPxe3KjgPSAvPs__mwoRM',
    privateKey: 'T_khU9BUNLDt7x-DKxBi8gG09g_j_L68qcTKDapLLSQ'
};
push.setVapidDetails('http://localhost:8008', vapidKeys.publicKey, vapidKeys.privateKey);

exports.handleWebClientSubscription = (request, response, next) => {
    subscriptions[0] = {...request.body};
    response.status(201).json({message: 'server : subscription registered !'});
    tools.subscribeToMN(subscriptions[0].containerId);
};

exports.sendNotificationToWebClient = (request, response, next) => {
   if(request.body['m2m:sgn']['m2m:vrq']){
        console.log('REQUEST BODY NOTIFICATION');
        console.log(request.body);
        response.status(200).json({message: 'poa'});
   }else if(request.body['m2m:sgn']['m2m:nev']){
        console.log('REQUEST BODY CONTENT');
        console.log(request.body['m2m:sgn']['m2m:nev']['m2m:rep']);
        response.status(200).json({message: 'notification received'});
        push.sendNotification(subscriptions[0].push, 'test');
   }
};


require('dotenv').config();
// this object will contain the configurations needed to push notifications to the web client
let push = require('web-push');
//this array contains web clients' subscription, so far we juste allow one subscription at a time
const subscriptions = {};
const tools = require('../onem2m/tools');
// this array acts like a database of users and their respective rooms
const loginsArray = [{
        identifiers: {
            login: 'admin',
            password: 'admin'
        },
        logged: false,
        aeArray: [
                {
                    aeName: 'ROOM 1',
                    aeId: 'CAE167174759',
                    containersArray: [{
                        containerName: 'TEMPERATURE',
                        containerId: 'cnt-586966070'
                    }, 
                    {
                        containerName: 'ACCELEROMETER',
                        containerId: 'cnt-434134342'
                    }]
                },
                {
                    aeName: 'ROOM 2',
                    aeId: 'CAE76730074',
                    containersArray: [
                        {
                            containerName: 'TEMPERATURE',
                            containerId: 'cnt-370117753',
                        }, 
                        {
                            containerName: 'ACCELEROMETER',
                            containerId: 'cnt-378867500'
                        }]
                }
        ]
    }, 
    {
        identifiers: {
            login: 'test',
            password: 'test'
        },
        logged: false,
        aeArray: [
            {
                aeName: 'ROOM 2',
                aeId: 'CAE76730074',
                containersArray: [
                    {
                        containerName: 'TEMPERATURE',
                        containerId: 'cnt-370117753',
                    }, 
                    {
                        containerName: 'ACCELEROMETER',
                        containerId: 'cnt-378867500'
                    }]
            }
        ]      
}];

push.setVapidDetails(process.env.WEB_USER_APPLICATION_NODE, process.env.VAPIDKEYS_PUBLICKEY, process.env.VAPIDKEYS_PRIVATEKEY);

exports.login = (request, response, next) => {
    if(element = loginsArray.find(element => ( (element.identifiers.login === request.body.login) && (element.identifiers.password === request.body.password)))){
        response.status(200).json({
            identifiers: element.identifiers,
            aeArray: element.aeArray
        });
        element.logged = true;
    }else{
        response.status(401).json({message: 'invalid IDs'});
    }
};

exports.handleWebClientSubscription = (request, response, next) => {
    // we save web client in our subscription system so we can notify him
    subscriptions[0] = {...request.body};
    response.status(201).json({message: 'server : subscription registered !'});
    // we let the gateway node know we have a subscriber
    tools.subscribeToMN(subscriptions[0].identifiers, subscriptions[0].containerId);
};

exports.sendNotificationToWebClient = (request, response, next) => {
   if(request.body['m2m:sgn']['m2m:vrq']){
        response.status(200).json({message: 'poa'});
   }else if(request.body['m2m:sgn']['m2m:nev']){
        //we respond to the gateway node to confirm we received its new data
        response.status(200).json({message: 'notification received'});
        // now before forwarding this new data to our web client, we have to make sure
        // he is still logged in and he is allowed to access this new data just received
        let pursueNotificationProcess = false;
        let notification = request.body['m2m:sgn']['m2m:nev']['m2m:rep'];
        let loggedUser = loginsArray.find(element => element.logged == true);
        for(let ae of loggedUser.aeArray){
            for(let container of ae.containersArray){
                if(container.containerId === notification['m2m:cin'].pi.split('/mn-cse/')[1]){
                    pursueNotificationProcess = true;
                }
            }
        }
        if(pursueNotificationProcess){
            //we send the new data received onto the gateway node to the web client
            push.sendNotification(subscriptions[0].push, JSON.stringify(request.body['m2m:sgn']['m2m:nev']['m2m:rep']['m2m:cin']));
        }
   }
};

exports.logout = (request, response, next) =>{
    // if a user web client logs out, we make sure its identifiers are correct
    if(element = loginsArray.find(element => (element.logged == true) && (element.identifiers.login === request.body.login) && (element.identifiers.password === request.body.password) )){
        //lets not forget to set the user's logged state to false
        element.logged = false;
        response.status(200).json({message: 'logged out successfully'});
    }else{
        response.status(400).json({message: 'unknown user'});
    }
};

const fetch = require('cross-fetch');
require('dotenv').config();

exports.subscribeToMN = (identifiers, containerId) => {
    console.log("sending subscribtion request to MN node");
    console.log(identifiers);
    console.log(containerId);
    console.log('nu');
    console.log(process.env.SERVER_NODE + "onem2m");
    fetch(process.env.GATEWAY_NODE+containerId, {
        method: 'POST',
        headers: {
            'X-M2M-Origin': identifiers.login + ':' + identifiers.password,
            'Content-Type': 'application/json;ty=23',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
                "m2m:sub": {
            
                  "nu": process.env.SERVER_NODE + "onem2m",
            
                  "nct": 2,
            
                  "rn": "SUB_DATA_ROOM_"+identifiers.login
            
                }            
        })
    })
    .then(result => {
        if(result.ok){
            return result.json();
        }
    })
    .then(result => {
        console.log('MN SUBSCRIPTION OK : ');
        console.log(result);
    })
    .catch(error => {
        console.log('MN SUBSCRIPTION ERROR: ');
        console.log(error);
    });
}
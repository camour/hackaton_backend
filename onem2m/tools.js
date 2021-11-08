const fetch = require('cross-fetch');
require('dotenv').config();

exports.subscribeToMN = (identifiers, containerId) => {
    fetch(process.env.MN_NODE+containerId, {
        method: 'POST',
        headers: {
            'X-M2M-Origin': identifiers.login + ':' + identifiers.password,
            'Content-Type': 'application/json;ty=23',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
                "m2m:sub": {
            
                  "nu": process.env.MY_NODE + "onem2m",
            
                  "nct": 2,
            
                  "rn": "SUB_DATA_CHAMBRE_1_"+identifiers.login
            
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
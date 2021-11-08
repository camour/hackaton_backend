const fetch = require('cross-fetch');

exports.subscribeToMN = (identifiers, containerId) => {
    console.log('identifiers :');
    console.log(identifiers);
    fetch('http://172.20.10.2:8282/~/mn-cse/'+containerId, {
        method: 'POST',
        headers: {
            'X-M2M-Origin': identifiers.login+':'+identifiers.password,
            'Content-Type': 'application/json;ty=23',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
                "m2m:sub": {
            
                  "nu": "http://172.20.10.5:3000/onem2m",
            
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
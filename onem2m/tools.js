const fetch = require('cross-fetch');

exports.subscribeToMN = (containerId) => {
    fetch('http://localhost:8282/~/mn-cse/'+containerId, {
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
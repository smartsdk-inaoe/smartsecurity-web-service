const { DateTime } = require('luxon');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

exports.query = async function (req,res) {    
    let query = ngsi.createQuery(req.body);
    await cb.getWithQuery(query)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((error) =>{
        res.status(500).send(error);
    })
} 
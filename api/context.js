var cb = require('ocb-sender');
var ngsi = require('ngsi-parser');
cb.config('http://207.249.127.218',1026,'v2')

exports.create = async (type, json, callback) =>{
    json["id"] = json[`id${type}`]
    delete json[`id${type}`] ;
    json["dateCreated"] = new Date(json.dateCreated),
	json["dateModified"] = new  Date(json.dateModified)	
    let NGSIentity = ngsi.parseEntity(json)
    await cb.createEntity(NGSIentity)
    .then((result) => {
        console.log(result)
        callback(true, NGSIentity);
    })
    .catch((err) => {
        callback(false,{message: err});
    })
}
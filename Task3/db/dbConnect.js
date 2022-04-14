const MongoClient = require('mongodb').MongoClient;
const myConnection = (callback)=>{
MongoClient.connect(process.env.dbURL,{},(err, client)=>{
    if(err) callback(err,false)
    const db = client.db(process.env.dbName);
    callback(false,db);
})
}

module.exports =myConnection;
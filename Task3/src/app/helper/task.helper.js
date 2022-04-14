const con = require('../../../db/dbConnect');
const ObjectId = require('mongodb').ObjectId;
class Task{
    static showTaskSingle = (taskId,callback)=>{
        con((err,db)=>{
            if(db)
            db.collection("TaskAppDB").findOne({_id:new ObjectId(taskId)},(e,data)=>{
                callback(false,data)
            })
        })
    }
    /*static searchTitle = (data,callback) =>{
        con((err,db)=>{
            if(db)
            db.collection("TaskAppDB").find({title:data}).toArray((e,result)=>{
                callback(result)
            })
            
        })
    }*/
    static add = (data,callback) =>{
       /* this.searchTitle(data.title,(result)=>{
            if(result.length==2){
                callback(false)
            }else{*/
                con((err,db)=>{
                    if(db)
                    db.collection("TaskAppDB").insertOne(data,(e,result)=>{
                        callback(false,result)
                    })
                })
           // }
        //})
    }
    static showAll = (callback)=>{
        con((err,db)=>{
            db.collection("TaskAppDB").find({}).toArray((e,result)=>
            {
                callback(e,result)
            }) 
        })
    } 

    static edit = (taskId,data,callback)=>{
        const taskIdObj = new ObjectId(taskId)
        con((err,db)=>{
            if(err) return callback(err,false)
            db.collection("TaskAppDB").updateOne({_id:taskIdObj},{$set:data},(e,result)=>{
                callback(e,result);
            })
        })
    }
    static del = (taskId,callback)=>{
        const taskIdObj = new ObjectId(taskId)
        con((err,db)=>{
            if(err) return callback(err,false)
            db.collection("TaskAppDB").deleteOne({_id:taskIdObj},(e,result)=>{
                callback(e,result);
            })
        })
    }

}
module.exports= Task;
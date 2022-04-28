/*const mongoose = require('mongoose');
const votesSchema = require('../../database/models/voting.model');
const answerSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    asnwers:{
        type:Number,
        required:true,
        textbody:String,
    },
    answerBody: {
         type: String,
        required: true
     },
    createdAt:{
        created:Date.now(),
        type:Date,
    },
    votes:[votesSchema],
    scored:{
        type:Number,
        default:0,
    }
},
{ _id: false }
)
const answers = mongoose.model("answers",answerSchema)
module.exports = answers
*/
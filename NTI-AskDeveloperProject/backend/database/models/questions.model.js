const mongoose = require('mongoose');
const votingSchema = require('../../database/models/voting.model');
const answerSchema = require('../../database/models/answers.model');

const questionSchema= mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    questionTitle:{
        type:String,
        required:true,
    },
    questionbody:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        default:"text",
    },
    tags: [
        { 
            type: String,
            required: true
        }
    ],
    //votes: [votingSchema],
    //answers:[answerSchema],
}, {
    timestamps:true  //createdAt, updatedAt
}
)
const questions = mongoose.model("questions",questionSchema)
module.exports = questions
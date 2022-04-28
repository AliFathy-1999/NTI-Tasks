const mongoose = require('mongoose');
const votesSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    vote:{
        type:Number,
        required:true,
    },
},
{ _id: false }
)
const votes = mongoose.model("votes",votesSchema)
module.exports = votes
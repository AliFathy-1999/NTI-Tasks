const questionsModel = require('../../database/models/questions.model');
const userModel = require('../../database/models/user.model');
//Add Question ,  Edit Question ,  Delete Question, Get All Questions,  Get Single Question
class Questions{
    static helloworld= (req,res)=>{
        res.send("Hello from questions api routes");
    }
    static addQuestion= async(req,res)=>{
        try{
            const newQuestion = new questionsModel({
                ...req.body,
                UserId:req.user._id,
            })
            await newQuestion.save();
            res.status(200).send({
                apiStatus:true,   
                data:newQuestion,
                message:"Question added successfully"               
            })
        }catch(e){
            res.status(500).send({
                apiStatus:false,    
                message:e.message
            });
        }
    }
   static getMyQuestions = async(req,res)=>{
        //myQuestions
        try{
            await req.user.populate("MyQuestions");
            res.status(200).send({
                apiStatus:true,   
                data:req.user.MyQuestions,
                message:"Question getted successfully"  
            })
        }catch(e){
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }
}
module.exports = Questions;
const questionsModel = require('../../database/models/questions.model');
const userModel = require('../../database/models/user.model');

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
   static getAllMyQuestions = async(req,res)=>{
        //myQuestions
        try{
            //await req.user.populate("MyQuestions");
            const myQuestions = await questionsModel.find({UserId:req.user._id});
            res.status(200).send({
                apiStatus:true,   
                data:myQuestions,
                message:"Question getted successfully"  
            })
        }catch(e){
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }
    static getAllUsersQuestions = async(req,res)=>{
        //myQuestions
        try{
            //await req.user.populate("MyQuestions");
            const myQuestions = await questionsModel.find();
            res.status(200).send({
                apiStatus:true,   
                data:myQuestions,
                message:"All Questions getted successfully"  
            })
        }catch(e){
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }
    static addAnswer = async(req,res)=>{
        try{
            const question = await questionsModel.findByIdAndUpdate(req.params.id,req.body);
            question.answers.push(req.body);
            await question.save();
            res.status(200).send({
                apiStatus:true,   
                data:question,
                message:"Answer added successfully"               
            })
        }catch(e){
            res.status(500).send({
                apiStatus:false,    
                message:e.message
            });
        }
    }
}
module.exports = Questions;
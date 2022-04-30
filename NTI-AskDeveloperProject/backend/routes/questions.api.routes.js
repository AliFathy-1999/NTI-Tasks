const questionsRoutes=require("express").Router();
const questionsController = require("../app/controller/questions.api.controller"); 
const auth = require("../app/middleware/auth");

//questionsRoutes.get("/",questionsController.helloworld);
questionsRoutes.post("/addquestion",auth,questionsController.addQuestion);
questionsRoutes.get("/getmyquestions",auth,questionsController.getMyQuestions);
module.exports=questionsRoutes;

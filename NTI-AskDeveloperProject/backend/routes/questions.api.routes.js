const questionsRoutes=require("express").Router();
const questionsController = require("../app/controller/questions.api.controller"); 
const auth = require("../app/middleware/auth");

questionsRoutes.post("/addquestion",auth,questionsController.addQuestion);
questionsRoutes.get("/getAllmyquestions",auth,questionsController.getAllMyQuestions);
questionsRoutes.get("/getAllUsersQuestions",questionsController.getAllUsersQuestions);
questionsRoutes.post("/AddAnswer/:id",auth,questionsController.addAnswer);
module.exports=questionsRoutes;

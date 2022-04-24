const userRoutes=require("express").Router();
const userController = require("../app/controller/user.api.controller"); 
const auth = require("../app/middleware/auth");
userRoutes.get("/",userController.helloworld);
userRoutes.post('/register', userController.userRegister)
userRoutes.post('/login', userController.userLogin)
userRoutes.post('/all', auth,userController.all)
userRoutes.get('/me',auth,userController.me)
userRoutes.get('/logout',auth,userController.userLogout)
userRoutes.get('/logoutAll',auth,userController.userLogoutAll)
module.exports=userRoutes;
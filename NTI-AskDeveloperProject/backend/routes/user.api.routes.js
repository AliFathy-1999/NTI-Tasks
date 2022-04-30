const userRoutes=require("express").Router();
const userController = require("../app/controller/user.api.controller"); 
const auth = require("../app/middleware/auth");
const multer  = require('multer')
const upload = multer({ dest: 'backend/uploads' })

userRoutes.post('/register', userController.userRegister)
userRoutes.post('/login', userController.userLogin)
//userRoutes.get('/allusers/:pageNum/:limit', auth,userController.getAllUsers)
userRoutes.get('/allusers',userController.getAllUsers)
userRoutes.post('/editprofile/:id', auth,userController.editmyProfile)
userRoutes.get('/me',auth,userController.me)
userRoutes.get('/logout',auth,userController.userLogout)
userRoutes.get('/logoutAll',auth,userController.userLogoutAll)
userRoutes.post('/profile', auth,upload.single('profile'), userController.uploadImage)
module.exports=userRoutes;
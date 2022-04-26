const userModel = require("../../database/models/user.model")
const multer  = require('multer')
const path = require("path")
const fileSystem = require("fs")
const upload = multer({ dest: 'uploads' })
class User{
    static helloworld= (req,res)=>{
        res.send("Hello from user api routes");
    }
    static userRegister= async(req,res)=>{
        try{
            const userData = new userModel(req.body);
            await userData.save();
            res.status(201).send({
                apiStatus:true,
                data:userData,
                message:"User Registered Successfully"  
            })
        }catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e,
                message:e.message
            })
        }
    }
    static userLogin= async(req,res)=>{
        try{
            const userData = await userModel.login(req.body.email,req.body.password);
            const token = await userData.generateToken();
                return res.status(200).send({
                    apiStatus:true,
                    data:{user:userData,token},
                    message:"Login Successfully",
                })
            }catch(e){
                return res.status(500).send({
                    apiStatus:false,
                    data:e,
                    message:e.message
                })
            }
    }
    static all = async(req,res)=>{
        res.send(req.headers.authorization);
    }
    static me = async(req,res)=>{
        res.status(200).send({
            apiStatus:true,
            data: req.user
        })
    }
    static userLogout = async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token !== req.token
            })
            await req.user.save()
               res.status(200).send({
                    apiStatus:true,
                    message:"Logout Successfully",
                })
            }catch(e){
                res.status(500).send({
                    apiStatus:false,
                    message:e.message
                })
            } 
    }
    static userLogoutAll = async(req,res)=>{
        try{
            req.user.tokens = []
            await req.user.save()
               res.status(200).send({
                    apiStatus:true,
                    message:"All devices Logout Successfully",
                })
        }catch(e){
            return res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }
    static uploadImage =  async(req, res, next) =>{
            const imageDir = path.join(__dirname, `../${req.file.path}`);
            const newPath = `${imageDir}${path.extname(req.file.originalname)}`;
            fileSystem.rename(imageDir,newPath,()=>{})
            req.user.pImage=newPath;
            await req.user.save()
            res.status(200).send({
                user:req.user,
             })
    }   
        
}

module.exports=User;
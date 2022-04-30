const userModel = require("../../database/models/user.model")
const multer  = require('multer')
const path = require("path")
const fileSystem = require("fs")
class User{
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
    static getAllUsers= async(req,res)=>{
        /*const pageCount = +req.params.limit
        const pageNum = +req.params.pageNum  // start 0
        const users = 
            await userModel.find()
            .sort({fname:-1})
            .limit(pageCount)
            .skip(pageCount*pageNum)*/
            const users = await userModel.find();
        try{
            res.status(200).send({
                apiStatus:true,
                data:users,
                message:"All Users"
            })
        }catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e,
                Message:e.message,
            })
        }
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
        const imageDir =  req.file.path;
        const newPath = `${imageDir}${path.extname(req.file.originalname)}`;
        fileSystem.rename(imageDir,newPath,()=>{})
        req.user.pImage=`${imageDir}${path.extname(req.file.originalname)}`;
        await req.user.save()
        res.status(200).send({
            user:req.user,
         })
}   
    static editmyProfile = async(req,res)=>{
        try{
            const userData = await userModel.findByIdAndUpdate(req.params.id,req.body);
            await userData.save();
            res.status(200).send({
                apiStatus:true,
                data:userData,
                message:"User Profile Updated Successfully"
            })
        }catch(e){
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }
}

module.exports=User;
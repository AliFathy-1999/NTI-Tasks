const jwt = require('jsonwebtoken')
const User = require('../../database/models/user.model')

const auth = async(req, res, next) => {
    try{
        const token = req.header('Authorization').replace('bearer ', '')
        const decoded = jwt.verify(token, process.env.JWTKEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(500).send({
            apiStatus:false,
            message:"unauthorized",
            data:e.message
        })
    }

}

module.exports=auth;
 
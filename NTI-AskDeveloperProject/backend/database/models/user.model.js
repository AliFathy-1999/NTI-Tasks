const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    dob:{
        type:Date,
        max:Date.now(),
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){if(!validator.isEmail(value)){ throw new Error("Email is invalid")}}
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.includes("password") || value.includes(`${this.fname}`) || value.includes(`${this.lname}`)){
                throw new Error("Password cannot contain 'password' or first name or last name")
            }
        }
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error("Phone number is invalid")
            }
        }
    },
    status:{
        type:Boolean,
        default:false
    },
    pImage:{
        type:String,
        default: function () {
            return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
          },
    },
    titlejob:{
        type:String,
        required:true,
        default:"Developer"
    },
    tokens : [
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},{
    timestamps:true  //createdAt, updatedAt
})
Schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    delete userObject.tokens;
    return userObject;
}
Schema.statics.login = async function (email,password) {
    const userData = await User.findOne({email});
    if(!userData) throw new Error("invalid Email")
    const isMatch = await bcryptjs.compare(password,userData.password);
    if(!isMatch) throw new Error("invalid Password")
    return userData;
}
 Schema.methods.generateToken = async function () {
     const user = this;
     const token= jwt.sign({_id:user._id},process.env.JWTKEY)
     user.tokens = user.tokens.concat({token});
     await user.save();
     return token
 }
Schema.pre("save",async function(){
    const user = this
    if(user.isModified("password")){
        user.password = await bcryptjs.hash(user.password,10)
    }
})

const User = mongoose.model("User",Schema)

module.exports=User;
const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:1,
        max:255
    },
    email:{
        type:String,
        required:true,
        max:255,
},
password:{
    type:String,
    required:true,
    max:1024,
    min:6,
},
role:{
    type:String,
    required:true,
  min:2,
},
Permissions:{
type:Array,
},

isVerified:{
    type:Boolean,
  
    default:false
},

token_activate_account:{
    type:String
},
token_reset_password:{
    type:String
},
acc_create:{
    type: Date,
    default: Date.now

}
},{
    timestamps:true
}
);

const User=mongoose.model('user',userSchema);
module.exports=User;
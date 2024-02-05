const mongoose=require('mongoose');

const CustomerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,},
    email:{
        type:String,
        required:true,
},
password:{
    type:String,
    required:true,
    min:6,
},

account_activated:{
    type:Boolean,
    default:false
},
token_activate_account:{
    type:String
},
token_reset_password:{
    type:String
},
})

const Customer=mongoose.model('customer',CustomerSchema);
module.exports=Customer;
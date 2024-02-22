const mongoose=require('mongoose');

const ContactSchema=mongoose.Schema({
    contact_id:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true, 
    },
    address:{
        type:String,
        required:true,
    },
    phonenumber:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    }
})

const Contact=mongoose.model('contact',ContactSchema);
module.exports=Contact;
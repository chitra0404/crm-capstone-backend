const mongoose=require('mongoose');
const MEET_STATUS=require("../config/meetigstatus");
const MEET_STATUS_VALUES=Object.values(MEET_STATUS);

const MeetingSchema=mongoose.Schema({
    meet_id:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        required:true,},
    email:{
        type:String,
        required:true,
},
time:{
    type:String,
    required:true,
    min:6,
},
date:{
    type:Date,
    require:true
},
subject:{
    type:String,
    required:true,
    min:6,
},
meet_status : {
    type: String,
    required: true,
    enum: MEET_STATUS_VALUES,
    default: MEET_STATUS.open,
},

})

const Meeting=mongoose.model('Meeting',MeetingSchema);
module.exports=Meeting;
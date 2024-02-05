const mongoose=require("mongoose");
const LEAD_STATUS=require("../config/leadStatus");
const LEAD_STATUS_VALUES=Object.values(LEAD_STATUS);

const LeadSchema=mongoose.Schema({
    leadid:{
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    lead_name: {
        type: String,
        required: true,
        trim: true,
    }, lead_email: {
        type: String,
        unique: true,
        trim: true,
    },
    lead_phone: {
        type: String,
        unique: true,
        trim: true,
    },
    lead_status : {
        type: String,
        required: true,
        enum: LEAD_STATUS_VALUES,
        default: LEAD_STATUS.Approached,
    },
})

const Lead=mongoose.model("lead",LeadSchema);
module.exports=Lead;
const mongoose=require('mongoose');
const REQUEST_STATUS=require('../config/request_status');
const REQUEST_STATUS_VALUES=Object.values(REQUEST_STATUS);

const requestSchema=mongoose.Schema({
    requestID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    title:{
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    orderID: {
        type: String,
        required: true,
        trim: true,
    },
   
    cust_email: {
        type: String,
        required: true,
        trim: true,
    },
    cust_phone: {
        type: String,
        required: true,
        trim: true,
    },
    request_date: {
        type: String,
        required: true,
        trim: true,
        default:Date.now(),
    },
    request_status: {
        type: String,
        required: true,
        enum: REQUEST_STATUS_VALUES,
    },
    request_engg: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
        type: String,
        required: true,
        max: 255,
        min: 2,
      },
})

const Request=mongoose.model("request",requestSchema);
module.exports=Request;
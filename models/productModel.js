const mongoose=require('mongoose');
const PRODUCT_TYPE=require('../config/product_types');
const PRODUCT_STATUS=require('../config/product_status');
const product_types_values=Object.values(PRODUCT_TYPE);
const product_status_values=Object.values(PRODUCT_STATUS);
const {nanoid}=require("nanoid");


const productSchema=mongoose.Schema({
    product_id:{
        type:String,
        required:true,
        trim:true,
    },
    product_name:{
        type:String,
        required:true,
        trim:true,
    },
    // product_model:{
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
    product_type: {
        type: String,
        required: true,
        enum: product_types_values,
        default: PRODUCT_TYPE.New_Product,
    },
    product_price:{
        type: Number,
        required: true,
    },
    product_stock:{
        type: Number,
        required: true,
        default: 5,
    },
    
    product_desc:{
        type: String,
        required: true,
        trim: true,
    },
  
    product_status:{
        type: String,
        required: true,
        trim: true,
        enum: product_status_values,
        default: PRODUCT_STATUS.Available,
    },
    
})


const Product=mongoose.model('product',productSchema);
module.exports=Product;
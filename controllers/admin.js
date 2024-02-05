const Product=require('../models/productModel');
const {nanoid}=require('nanoid');

module.exports.addProduct=async(req,res)=>{
    // try{
  
      const product=req.body;
  console.log({product});
      const id=nanoid(7);
      const productid="pd"+id;
  
     
      const newproduct=new Product({product_id:productid,...product})
      console.log("newProduct",newproduct);
      await newproduct.save();
      res.status(200).json({message:"success"});
  
  
    
//     catch(err){
//       res.status(500).send({message: "Internal server error", error: err});
//     }
  }
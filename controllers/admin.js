const Product=require('../models/productModel');
const {nanoid}=require('nanoid');
const Meeting=require('../models/MeetingModel');
const {NodeMailer}=require('../nodemailer/nodemailers')

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



  module.exports.addMeeting=async(req,res)=>{
    const meeting=req.body;
    const id=nanoid(7);
      const meetingid="mt"+id;
    const newmeeting=new Meeting({meet_id:meetingid,...meeting})
    console.log("newProduct",newmeeting);
    await newmeeting.save();
    res.status(200).json({message:"success"});
    const sub = newmeeting.subject;
    const email=newmeeting.email;

    NodeMailer( email,  sub);
  }

  module.exports.getMeet= async (req, res) => {
    try {
      const meet = await Meeting.find().exec();
      res.status(200).send(meet);
    } catch (error) {
      console.log(error);
    }
  };
  module.exports.updateMeet=async (req, res) => {
    try {
      const meet = await Meeting.findOneAndUpdate({ meet_id: req.body.meet_id},{meet_status : req.body.meet_status },{new:true});
      // leads.set(req.body);
      // const result = await leads.save();
      return res.status(200).json({ message : "MEEting status updated"});
    } catch (error) {
      res.status(500).send(error);
    }
  }
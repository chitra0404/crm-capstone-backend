const Contact=require('../models/contactModel');
const {nanoid}=require('nanoid');


module.exports.getContact=async(req,res)=>{
    const contact=await Contact.find();
    console.log(contact);
    res.send(contact);

}





module.exports.createContact=async(req,res)=>{
    const contact=req.body;
    console.log(contact);
    const id=nanoid(7);
    const contactid="cd"+id;
    const newcontact=new Contact({contact_id:contactid,...contact})
    console.log("newcontact",newcontact);
    await newcontact.save();
    res.status(200).json({message:"success"});



}
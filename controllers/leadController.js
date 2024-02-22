const Lead=require("../models/lead");
const {nanoid}=require("nanoid");

module.exports.createLead= async(req,res) => {
    console.log("add new lead", req.body)
    try{
         if(! req.body)
         return res.status(401).json({message : "No data provided"});
        const id = nanoid(6)
        const leadid = "LD-"+id

       
         const newLead = new Lead({...req.body, leadid })
         await newLead.save();
         console.log("NEW lead added");
       
          return res.status(200).json({message: "Lead added", leadid });
         
        
        
  
      }
    catch(error){
      console.log(error)
        res.status(500).send({message: "Internal server error", error: error})
      }
  } 

  module.exports.getLead= async (req, res) => {
    try {
      const leads = await Lead.find().exec();
      res.status(200).send(leads);
    } catch (error) {
      console.log(error);
    }
  };

  module.exports.deleteLead=async (req, res) => {
    try {
      const leads = await Lead.deleteOne({ _id: req.body._id });
      res.status(200).send("deleted suuccesfully");
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };

  module.exports.updateLead=async (req, res) => {
    try {
      const leads = await Lead.findOneAndUpdate({ leadid: req.body.leadid},{lead_status : req.body.lead_status },{new:true});
      // leads.set(req.body);
      // const result = await leads.save();
      return res.status(200).json({ message : "lead status updated"});
    } catch (error) {
      res.status(500).send(error);
    }
  }
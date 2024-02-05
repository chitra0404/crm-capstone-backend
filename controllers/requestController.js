const Request=require('../models/getrequest');

const {nanoid}=require('nanoid');

module.exports.createRequest=async(req,res)=>{
    try{
        console.log(req.body);
        const id = nanoid(12)
        const requestID = 'SR-'+id 
        const createRequest = new Request({ ...req.body, requestID : requestID}) 
        await createRequest.save()
        console.log("NEW request placed data saved");

        return res.status(200).json({"message": "request placed", 
        request: { ...req.body, requestID : requestID} });
}catch(error){
    console.log(error)
      res.status(500).send({message: "Internal server error", error: error})
    }
}

module.exports.getRequest=async(req,res)=>{
    try{
    let ticket=await Request.find().exec();
    res.status(200).send(ticket);
    }catch(err){
        res.status(400).send(err);
    }
}

module.exports.deleteRequest=async(req,res)=>{
    try {
        const tickets = await Request.deleteOne({ _id: req.body._id });
        res.status(200).send("deleted suuccesfully");
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
}

module.exports.updateRequest=async(req,res)=>{
    try {
        const tickets = await Request.findById(req.params.id).exec();
        tickets.set(req.body);
        const result = await tickets.save();
        res.send(result);
      } catch (error) {
        res.status(500).send(error);
      }
}
const router=require('express').Router();
const {Register,Login,deleteUser}=require("../controllers/adminController")
const{addProduct}=require('../controllers/admin');
const verify=require("./verify");
const { createRequest, getRequest, updateRequest, deleteRequest } = require('../controllers/requestController');
const { createLead, getLead, deleteLead, updateLead } = require('../controllers/leadController');


router.post("/reg",verify,Register);

router.post("/login",Login);
router.delete("/delete",deleteUser);
router.post("/add",addProduct);
router.post("/createreq",createRequest);
router.get("/get",getRequest);
router.patch("/update",updateRequest);
router.delete("/delete/:id",deleteRequest);
router.post("/createLead",verify,createLead);
router.get("/getlead",getLead);
router.delete("/del",deleteLead);
router.patch("/updateLead/:id",updateLead);
// router.post("/login",verify,Login);


module.exports=router;
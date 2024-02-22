const router=require('express').Router();
const { addMeeting, getMeet, updateMeet } = require('../controllers/admin');
const {getUser,Register,Login,AccountActivation}=require("../controllers/managerControllers")
const verify=require("./verify")


router.post("/reg",Register);
router.post("/add",addMeeting)
router.get("/get",getMeet);
router.post("/update",updateMeet)
router.post("/login",Login);
// router.post("/login",verify,Login);


module.exports=router;
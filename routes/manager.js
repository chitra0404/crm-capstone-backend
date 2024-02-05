const router=require('express').Router();
const {getUser,Register,Login,AccountActivation}=require("../controllers/managerControllers")
const verify=require("./verify")


router.post("/reg",Register);

router.post("/login",Login);
// router.post("/login",verify,Login);


module.exports=router;
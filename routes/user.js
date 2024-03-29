const router=require('express').Router();
const {getUser,Register,Login,AccountActivation,PasswordResetLink,PasswordUpdate, checkActivation}=require("../controllers/userController")
const verify=require("./verify")



router.get("/",getUser);
router.post("/register",Register);
router.patch('/activate/:id', AccountActivation );
router.get('/check-activation/:id',checkActivation);
router.post("/login",Login)
router.put('/forgotPassword',PasswordResetLink)
router.patch('/PasswordReset/:id',PasswordUpdate)

// router.post('/activate-mail', resendActivation)
// router.post('/forgotpwd', forgotPassword)
// router.post('/forgotpwd/authorize/:id/:token', authorizePwdReset)
// router.post('/reset-pwd/:id/:token', resetPassword)


module.exports=router;
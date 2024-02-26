const router=require("express").Router();
const {getCustomer,Signup,Login,AccountActivation,PasswordResetLink,PasswordUpdate,checkActivation}=require('../controllers/customer')


router.get('/users',getCustomer)
router.post('/signup',Signup)
router.patch('/activate/:id',AccountActivation)
router.get('/check-activation/:id',checkActivation);
router.post('/signin',Login)
router.put('/forgotPassword',PasswordResetLink)
router.patch('/PasswordReset/:id',PasswordUpdate)



module.exports=router;

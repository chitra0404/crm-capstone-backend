const router=require("express").Router();
const {getCustomer,Signup,Login,AccountActivation,PasswordResetLink,PasswordUpdate}=require('../controllers/customer')


router.get('/users',getCustomer)
router.post('/signup',Signup)
router.patch('/activate/:id',AccountActivation)
router.post('/signin',Login)
router.put('/forgotPassword',PasswordResetLink)
router.patch('/PasswordReset/:id',PasswordUpdate)



module.exports=router;

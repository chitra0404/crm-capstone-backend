require('dotenv').config();
const Customer=require('../models/customerModel');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const {NodeMailer}=require('../nodemailer/nodemailer');

module.exports.getCustomer=async(req,res)=>{
    const customer=await Customer.find();
    console.log(customer);
    res.send(customer);

}


module.exports.Signup=async (req,res)=>{
    try{
const {name,email,password}=req.body;
//check if existing customer
const ExistingCustomer=await Customer.findOne({email});
if(ExistingCustomer){
    return res.status(400).json({message:'Customer already exist'});
}

//hashed password
const hashedpassword=await bcrypt.hash(password,10);

//creating new customer
const newCustomer=new Customer({
    name,
    email,
    password:hashedpassword,
})
await newCustomer.save();
res.status(200).json({message:"userresigtered successfully"});

//create links
 
const randomString =
Math.random().toString(36).substring(2, 15) +
Math.random().toString(36).substring(2, 15);

const link = `https://crm-frontend-7w5t.vercel.app/acc/${randomString}`;

const sub = "Account Activation"

NodeMailer(randomString, email, link, res, sub);

//create Nodemailer
    } catch (err) {
        console.error('Error signing up user', err);
        return res.status(400).json({ Message: "Internal server error" })
    }

}

module.exports.AccountActivation = async (req, res) => {

    try {
        console.log(req.params.id);
        const tok  = req.params.id;
        console.log(tok);

        const customer = await Customer.findOne({ token_activate_account: tok });

        // if (!customer) {
        //     return res.status(400).json({ Message: "User not found or Activated account" });
        // }

        customer.account_activated = true

        customer.token_activate_account = "Account Activated";

        const updated = await Customer.findByIdAndUpdate(customer._id, customer);

        if (updated) {
            return res.status(201).json({ Message: "Account activated" });
        }
    }
    catch (err) {
        console.error('Error signing up user', err);
        return res.status(400).json({ Message: "Internal server error" })
    }
}



module.exports.Login=async(req,res)=>{
    const {email,password}=req.body;
    const customer=await Customer.findOne({email});
    if(!customer){
        return res.status(409).json({message:"authentication failed"});
    }
        const passwordmatch=await bcrypt.compare(password,customer.password);
        if(!passwordmatch){
            return res.status(409).json({message:"invalid password"}); }
            if(customer.account_activated){
                const token=jwt.sign({ customerId:customer._id},process.env.TOKEN_SECRET,{expiresIn:'24hr'})
                return res.status(200).json({token});
            }
            else{
                return res.status(400).json({ message: 'Account not activated' });
            }
    
}



module.exports.PasswordResetLink = async (req, res) => {
    // try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ Err: "please enter valid email" });

        }
        const matchedUser = await Customer.findOne({ email });
        if (!matchedUser) {
            return res.status(400).json({ Err: "user not found exists" });

        }

        const randomString =
            Math.random().toString(16).substring(2, 15) +
            Math.random().toString(16).substring(2, 15);


        matchedUser.token_reset_password = randomString;

        await Customer.findByIdAndUpdate(matchedUser.id, matchedUser);
        res.status(200).json({message:"mail sent"});

        //sending email for resetting
        const link = `https://crm-frontend-7w5t.vercel.app/reset/${randomString}`;

        const sub = "Reset password"

        NodeMailer(randomString, email, link, res, sub);

    // } catch (error) {
    //     return res.status(500).json(error);
    // }
}

module.exports.PasswordUpdate = async (req, res) => {
    try {
        const resetToken = req.params.id;
        console.log(resetToken);
        const { password } = req.body;
        const matchedUser = await Customer.findOne({ token_reset_password:  resetToken });
      
        if (matchedUser === null || matchedUser.token_reset_password === "") {
            return res
                .status(400)
                .json({ Err: "user not exists or reset link expired" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        matchedUser.password = hashedPassword;
        matchedUser.token_reset_password = `Password Updated on ${new Date()}`;


        await Customer.findByIdAndUpdate(matchedUser.id, matchedUser);
        return res.status(201).json({
            message: `${matchedUser.name} password has beed changed sucessfully`,
        });
    } catch (error) {
        return res
            .status(400)
            .json({ Err: "user not exists or reset link expired" });
    }
}

module.exports.logout=async(req,res)=>{
    
    res.json({message:"logoutsuccessfully"});

}


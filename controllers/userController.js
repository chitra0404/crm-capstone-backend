const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {NodeMailer}=require('../nodemailer/mailer')


module.exports.getUser=async(req,res)=>{
    try{
    const user=await User.find()
    res.status(200).send({ status: "200", message: user });
} catch (error) {
  console.log(error);
  res.status(200).send({ status: "500", message: error });
}
}


module.exports.Register=async(req,res)=>{
    try{

    const {name,email,password,role}=req.body;
   
    const emailexist=await User.findOne({email:req.body.email})
    if(emailexist){
        res.status(400).json({
            status: "400",
            message: "This email is already in use",
          });
          return;
    }
    const hashedpassword=await bcrypt.hash(password,10);
    
    const token = jwt.sign(
        { email, role },
        process.env.TOKEN_SECRET
      );
    const user=new User( { name,email, password: hashedpassword,role,token, isVerified:false });
 
    await user.save();
    res.status(200) .header("auth-token").json({token:token});
    const randomString =
Math.random().toString(36).substring(2, 15) +
Math.random().toString(36).substring(2, 15);

const link = `https://crm-frontend-7w5t.vercel.app/user/acc`;

const sub = "Account Activationn"

NodeMailer(randomString, email, link,  sub);
    } catch (err) {
        console.error('Error signing up user', err);
        return res.status(400).json({ Message: "Internal server error" })
    }

}

module.exports.AccountActivation = async (req, res) => {
    try {
      // Find a customer based on the desired condition (e.g., email, username, etc.)
      const customer = await User.findOne({ token_activate_account: { $ne: "Account Activated" } });
  
      if (!customer) {
        return res.status(400).json({ Message: "No user found to activate the account" });
      }
  
      customer.isVerified = true;
      customer.token_activate_account = "Account Activated";
  
      const updated = await customer.save();
  
      if (updated) {
        return res.status(201).json({ Message: "Account activated" });
      }
    } catch (err) {
      console.error('Error activating account', err);
      return res.status(500).json({ Message: "Internal server error" });
    }
  };
module.exports.Login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(409).json({message:"authentication failed"});
    }
        const passwordmatch=await bcrypt.compare(password,user.password);
        if(!passwordmatch){
            return res.status(409).json({message:"invalid password"}); }
            if(user.isVerified){
                const role=user.role;
                const token=jwt.sign({ userId:user._id},process.env.TOKEN_SECRET,{expiresIn:'24hr'})
                return res.status(200).json({token,role});
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
        const matchedUser = await User.findOne({ email });
        if (!matchedUser) {
            return res.status(400).json({ Err: "user not found exists" });

        }

        const randomString =
            Math.random().toString(16).substring(2, 15) +
            Math.random().toString(16).substring(2, 15);


        matchedUser.token_reset_password = randomString;

        await User.findByIdAndUpdate(matchedUser.id, matchedUser);
        res.status(200).json({message:"mail sent"});

        //sending email for resetting
        const link = `https://crm-frontend-7w5t.vercel.app/user/reset/${randomString}`;

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
        console.log(password);
        const matchedUser = await User.findOne({ token_reset_password:  resetToken });
      console.log(matchedUser)
        if (matchedUser === null || matchedUser.token_reset_password === "") {
            return res
                .status(400)
                .json({ Err: "user not exists or reset link expired" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        matchedUser.password = hashedPassword;
        console.log(matchedUser.password);
        matchedUser.token_reset_password = `Password Updated on ${new Date()}`;


        await User.findByIdAndUpdate(matchedUser.id, matchedUser);
        return res.status(201).json({
            message: `${matchedUser.name} password has beed changed sucessfully`,
        });
    } catch (error) {
        return res
            .status(400)
            .json({ Err: "user not exists or reset link expired" });
    }
}

const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



module.exports.Register=async(req,res)=>{
const emailExist = await User.findOne({ email: req.body.email });
if (emailExist) res.status(400).send("Email already exists");

//HASHING THE PASSWORD


const hashedPassword = await bcrypt.hash(req.body.password, 10);

//ON PROCESS OF ADDING NEW USER

const user = new User({
  
  name: req.body.name,
  email: req.body.email,
  password: hashedPassword,
  role: "manager",
});
await user.save();
//   res.send({ user: user._id });
res.send("user created");
}

module.exports.Login=async(req,res)=>{
   
        const {email,password}=req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json("Incorrect Email- ID");

  //CHECKING IF USER PASSWORD MATCHES

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");
  

   
    
    if (user.role === "manager") {
      const token = jwt.sign(
        { id: user._id },
        process.env.TOKEN_SECRET
      );
      res.status(200).header("auth-token").send(token);
    } else {
      res.status(200).json({ message: "seems like you are not a manager" });
    }
    
// }
//  catch (error) {
//   res.status(400).send(error);
// }
}
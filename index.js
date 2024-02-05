const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const route=require('./routes/customer')
const userroute=require('./routes/user')
const manager=require('./routes/manager')
const admin=require('./routes/admin')
const product=require('./routes/product');
const order=require('./routes/order');
require('dotenv').config();
const app=express();

app.use(cors());
app.use(cors({
  origin: 'https://crm2-1b04.onrender.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());
app.use(route);
 app.use("/user",userroute);
app.use("/mag",manager);
app.use("/product",product);
app.use("/order",order);
app.use("/ad",admin);
// Logout API endpoint
app.post('/logout', (req, res) => { 
    res.json({ message: 'Logout successful' });
  });


const url=process.env.URL;

mongoose.connect(url)
.then(()=>console.log("connected to Mongodb"))
.catch((err)=>console.log("error",err));

const port=process.env.PORT;
app.listen(port,()=>console.log("listening to the port"));

const Product=require('../models/productModel');
const PRODUCT_STATUS=require('../config/product_types');
const {nanoid}=require('nanoid');
const Order=require('../models/ordermodel');
const ORDER_STATUS=require('../config/order_status');


module.exports.getAvailableProduct=async(req,res)=>{
    try{
    const products=await Product.find();
    if(products){
        res.status(200).json({products})
    }
    else{ 
    res.status(400).json({message:"Error occured"});
    }
}
    catch(error){
        res.status(500).send({message: "Internal server error", error: error})
      }
}

module.exports. getOrders = async(req,res) => {
  console.log("get orders,")
  try{
       if(! req.body)
       return res.status(401).json({message : "Invalid Credentials"});

       const orderHist = await Order.find(req.body).sort({order_date: -1})
       if(orderHist.length > 0) {
        return res.status(200).json({ ordersList : orderHist});
       }
       else {
        return res.status(404).json({message : "No orders found"});
       }

    }
  catch(error){
    console.log(error)
      res.status(500).send({message: "Internal server error", error: error})
    }
}

module.exports. monthlyOrders = async(req,res) => {
    console.log("get orders monthly and yearly,")
   
      try{
        const d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth()+1
        const pattern1  = "^" +  String(year) + 
                      ( month<10 ? '0'+String(month) : String(month)) + ".*"
         const ordersMonthly = await Order.find({order_date : { $regex : pattern1 }}).sort({order_date: -1})
         
         const pattern2  = "^" +  String(year) + ".*"
         const ordersYearly = await Order.find({order_date : { $regex : pattern2 }}).sort({order_date: -1})
    
         if(ordersMonthly.length > 0 || ordersYearly.length > 0) {
          return res.status(200).json({ ordersMonthly, ordersYearly });
         }
         else {
          return res.status(404).json({message : "No requests found"});
         }
    }
    catch(error){
      console.log(error)
        res.status(500).send({message: "Internal server error", error: error})
      }
  }
  
  // Get revenue from monthwise and yearwise for delivered orders
 module.exports. getRevenue = async(req,res) => {
    console.log("get revenue for month and year,")
      if(! req.body)
      return res.status(401).json({message : "Invalid Data"});
      try{
         const {month, year } = req.body
       
         const ordersYearly = await Order.aggregate([
            {
              $project : {
                
                order_status: 1,
                order_amount : 1,
                year : {
                  $substr : [ "$order_date", 0,4]
                },
                month : {
                  $substr : [ "$order_date", 4,2]
                },
                date : {
                  $substr : [ "$order_date", 6,2]
                }
               }
              },
             {
                $match : {
                   "year" : year,
                   "order_status" : ORDER_STATUS.Delivered
                 }
               },
  
            {
              $group : {
                "_id" : "$year",
                "revenue": {
                  $sum : "$order_amount"
                },
                count : { $sum : 1 }
              }
            }
              ])
        //console.log(ordersYearly)
         const ordersAllYearly = await Order.aggregate([
            {
              $project : {
                
                order_status: 1,
                order_amount : 1,
                year : {
                  $substr : [ "$order_date", 0,4]
                },
                month : {
                  $substr : [ "$order_date", 4,2]
                },
                date : {
                  $substr : [ "$order_date", 6,2]
                }
               }
              },
             {
                $match : {
                   "order_status" : ORDER_STATUS.Delivered
                 }
               },
  
            {
              $group : {
                "_id" : "$year",
                "revenue": {
                  $sum : "$order_amount"
                },
                count : { $sum : 1 }
              }
            },
            {
              $sort : {  _id: 1 }
            }
              ])
        //console.log(ordersAllYearly)
  
        // get month wise data for a particular year
         const ordersMonthly = await Order.aggregate([
            {
              $project : {
                
                order_status: 1,
                order_amount : 1,
                year : {
                  $substr : [ "$order_date", 0,4]
                },
                month : {
                  $substr : [ "$order_date", 4,2]
                },
                date : {
                  $substr : [ "$order_date", 6,2]
                }
               }
              },
            {
                $match : {
                   "year" : year,
                   "order_status" : ORDER_STATUS.Delivered
                 }
               },
            {
              $group : {
                "_id" : "$month",
                "revenue": {
                  $sum : "$order_amount"
                },
                count : { $sum : 1 }
              }
            },
            {
              $sort : {  _id: 1 }
            }
              ])
        //console.log(ordersMonthly)
         if(ordersMonthly.length > 0 || ordersYearly.length > 0  || ordersAllYearly.length > 0) {
          return res.status(200).json({ ordersMonthly, ordersYearly, ordersAllYearly});
         }
         else {
          return res.status(404).json({message : "No requests found"});
         }
    }
    catch(error){
      console.log(error)
        res.status(500).send({message: "Internal server error", error: error})
      }
  }
  
  // cancel an order
 module.exports. cancelOrder = async(req,res) => {
    console.log("cancel order")
    try{
         if(!req.body?.orderID)
         return res.status(401).json({message : "Invalid Credentials"});
  
         const cancel = await Order.findOneAndUpdate({ orderID: req.body.orderID}, 
                        {order_status : ORDER_STATUS.CancelReq }, {new:true})
         if(cancel) {
          return res.status(200).json({ message : "Request to cancel order placed"});
         }
         else {
          return res.status(400).json({message : "Order not cancelled"});
         }
  
      }
    catch(error){
      console.log(error)
        res.status(500).send({message: "Internal server error", error: error})
      }
  }
  
  // update order status
 module. exports. updateOrderStatus = async(req,res) => {
    console.log("update order")
    try{
      //   if(!req.body?.orderID)
      // return res.status(401).json({message : "Invalid Credentials"});
  
         const result = await Order.findOneAndUpdate({ orderID: req.body.orderID}, 
                        {order_status : req.body.order_status }, {new:true})
         //console.log(result)
         if(result) {
          return res.status(200).json({ message : "Order status updated"});
         }
         else {
          return res.status(400).json({message : "Order not updated"});
         }
  
      }
    catch(error){
      console.log(error)
        res.status(500).send({message: "Internal server error", error: error})
      }
  }
   
  
  // create new order
 module.exports. handleCreateOrder = async(req,res) => {
    try{
      console.log(req.body);
      const orderItems =  Object.values(req.body.order_items); 
     
      const low_stock = []

      try {
        console.log(orderItems);
      for( let i of orderItems) {
        console.log(i.qty);
        const result = await Product.findOneAndUpdate(
          { "product_id" : i.product_id},
          { $inc : { product_stock: -(i.qty) }},
          {new:true})
                 console.log(result.product_stock);
        
        console.log(result) 
        if(result.product_stock <= 10) {
          low_stock.push(result.product_id)
        } 
      
      
      if(low_stock.length > 0) {
        console.log("mail sales team to restock")
      } 
        // try{
        const id = nanoid(12)
        const orderID = 'OD-'+id
        console.log(req.body);
        const createOrder = new Order({ ...req.body, orderID : orderID}) 
        await createOrder.save()
             res.status(200).json({message:"success"});
  
              //  send mail to customer 
    //           verifyTransporter();
          
    //       const mailOptions = {
    //         from: process.env.MAIL_ID,
    //         to: req.body.cust_email,
    //         subject: `Your Order is placed. order ID : ${orderID}`,
    //         text: `Greetings from Clean Life ! 
    //         Your order has been placed: Your order ID : ${orderID}
    //         Your order will reach you by ${req.body.order_ETA}`
    //       };
  
    //       transporter.sendMail(mailOptions, function(error, info){
    //           if (error) {
    //             console.log(" Email not sent",error);
    //             return res.status(201).send({ message:"Error email"}); 
    //           } else {
    //             console.log(' Email sent' + info.response); 
    //    //         return res.status(200).send({ result:result.acknowledged, message: "Activation link sent", data:hashedUser.email}); 
    //           }
    //         });
  
    //           return res.status(200).json({"message": "order placed", order: {...req.body, orderID : orderID} });
          // }
    //       catch( error ) {
    //           console.log('Error adding  data', error.message);
    //           return res.status(400).json({message:"Order not placed"});
    //       }
     }
        }catch(error){
        console.log(error)
         return res.status(500).send({message: "Internal server error DB", error: error})
      }
  
      }
      catch(error){
        console.log(error)
          res.status(500).send({message: "Internal server error", error: error})
        }
      }
  
  
  // get all products sold count- category wise 
 module.exports. getProductSold = async(req,res) => {
    try{
      console.log(req.body)
      const productsSold = await Order.aggregate([
        {
          $project : {
              order_status : 1,
              order_items : 1, 
             order_date : 1,
             order_qty : 1,
             year : {
              $substr : [ "$order_date", 0,4]
            }   
          }
        },
        {
          $match : {
            "order_status" : ORDER_STATUS.Delivered, 
            "order_date" : { $regex : req.body.year },
          }
        }
       
      ])
  
      const productsSoldCount = await Order.aggregate([
        {
          $project : {
              order_status : 1,
              order_items : 1, 
             order_date : 1,
             order_qty : 1,
             year : {
              $substr : [ "$order_date", 0,4]
            }   
          }
        },
        {
          $match : {
            "order_status" : ORDER_STATUS.Delivered, 
            "order_date" : { $regex : req.body.year },
          }
        },
        {
          $group : {
            "_id" : "$order_status",
            "count" : { $sum : "$order_qty"},
            "amount" : { $sum : "$order_amount"},
          }
        }
       
      ])
      const productsCancelled = await Order.aggregate([
        {
          $project : {
              order_status : 1,
              order_items : 1, 
             order_date : 1,
             order_qty : 1,
             year : {
              $substr : [ "$order_date", 0,4]
            }   
          }
        },
        {
          $match : {
            "order_status" : ORDER_STATUS.Cancelled, 
            "order_date" : { $regex : req.body.year },
          }
        },
        {
          $group : {
            "_id" : "$order_status",
            "count" : { $sum : "$order_qty"},
            "amount" : { $sum : "$order_amount"},
          }
        }
       
      ]) 
      //console.log(productsCancelled, productsSoldCount)
      if(productsSold.length > 0 || productsSoldCount.length > 0 || productsCancelled.length > 0 ) {
         return res.status(200).json({productsSold , productsSoldCount, productsCancelled})
        }
        else {
          return res.status(400).json({message: "no data found"})
        }
        }
    catch(error){
      console.log(error)
        res.status(500).send({message: "Internal server error", error: error})
      }
  }







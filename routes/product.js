const { getAvailableProduct } = require('../controllers/productControllers');

const router=require('express').Router();


router.get("/getproducts",getAvailableProduct);



module.exports=router;



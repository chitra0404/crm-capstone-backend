const router=require("express").Router();
const verifyRolePermission=require('../middleware/verifyRolePermissio');
const USER_ROLES=require('../role');
const {handleCreateOrder,cancelOrder,updateOrderStatus,monthlyOrders,getRevenue,getOrders,getProductSold}=require('../controllers/productControllers')


router.post('/getorders',  getOrders )

router.post('/create-order',    handleCreateOrder )
router.post('/cancel-order',   cancelOrder )

router.post('/update-order',    updateOrderStatus )

router.post('/monthly-orders',   monthlyOrders ) 

router.post('/get-revenue',  getRevenue ) 

router.post('/get-products-data', getProductSold )
module.exports = router;
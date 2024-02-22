const { createContact, getContact } = require('../controllers/ContactControllers');


const router=require('express').Router();


router.get("/get",getContact);

router.post("/create",createContact);

module.exports=router;


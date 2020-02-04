const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const { body } = require('express-validator');
const {
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require("../controllers/contacts")


router.get("/",auth,getContact);

router.post("/",[
    body('name', "Name is required").not().isEmpty(),
    body('email', "Enter a valid email").isEmail()
],auth,createContact);

router.route("/:id").put(auth,updateContact);

router.route("/:id").delete(auth,deleteContact);


module.exports = router;

const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const { loginUser } = require("../controllers/auth");

router.route("/").get();
router.post("/", [
    body('email', 'Please includes a valid email').isEmail(),
    body('password', 'Please enter your password').exists()
],loginUser);


module.exports = router;
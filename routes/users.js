const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const {
    postUser
} = require("../controllers/users");


router.post("/",[
    body('name', 'Name is required').isString().not().isEmpty().trim(),
    body('email', 'Please enter a valid email').isEmail().trim(),
    body('password', 'Please enter a password with 6 or more character').isString().isLength({min:6}).trim()
], postUser);

// router.route("/").post();
// router.route("/:id").put();
// router.route("/:id").delete();


module.exports = router;

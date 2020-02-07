const Contact = require("../models/Contact");
const asyncFun = require("../middleware/async");
const { validationResult } = require("express-validator");
const ErrorRespose = require("../utils/errorResponse");

exports.getContact = asyncFun( async (req, res, next)=>{
    let error;
    const {
        user: {
            _id: userId
        }
    } = req;

    const contacts = await Contact.find({
        user: userId
    });


    res.status(200).send({
        success: true,
        contacts
    })
});


exports.createContact = asyncFun( async (req, res, next)=>{
    let error; 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        error={
            type: 'validationError',
            statusCode: 400,
            errors: errors.array()
        }
        throw new ErrorRespose("", error)
    }

    const { 
        user : {
        _id: userId
        },
        body:{
            email,
            name,
            phone,
            type
        }
    } = req;

    let contact
    contact = new Contact({
        name,
        email,
        phone,
        type,
        user: userId
    });

    contact = await contact.save();
    res.status(200).send(contact)
})


exports.updateContact = asyncFun( async (req, res, next)=>{
    res.send("get Contact")
})


exports.deleteContact = asyncFun( async (req, res, next)=>{
    res.send("get Contact")
})
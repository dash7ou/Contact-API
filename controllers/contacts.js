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
    }).sort('+createdAt')

    if(contacts.length === 0){
        res.send({
            success: true,
            contacts: []
        })
    }

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
    const {
        params: {
            id
        },
        user: {
            _id: userId
        },
        body
    } = req;

    let contact = await Contact.findById(id);
    if(!contact){
        error = {
            type: 'onlyMessage',
            statusCode: 404,
            message: 'This contact not found'
        }
        throw new ErrorRespose("", error)
    }

    if(contact.user.toString() !== userId.toString()){
        error = {
            type: 'onlyMessage',
            statusCode: 400,
            message: 'You are not owner '
        }
        throw new ErrorRespose("", error)
    }

    course = await Contact.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    })


    res.status(200).send({
        success: true,
        data: course
    })

})


exports.deleteContact = asyncFun( async (req, res, next)=>{
    let error;
    const {
        params:{
            id
        },
        user: {
            _id: userId
        }
    }= req;

    const contact = await Contact.findById(id);

    if(!contact){
        error = {
            type: 'onlyMessage',
            statusCode: 404,
            message: 'This contact not found'
        }
        throw new ErrorRespose("", error)
    }

    if(contact.user.toString() !== userId.toString()){
        error = {
            type: 'onlyMessage',
            statusCode: 400,
            message: 'You are not owner '
        }
        throw new ErrorRespose("", error)
    }
    await contact.remove();
    res.status(200).send({
        success: true,
        data: {}
    })
})
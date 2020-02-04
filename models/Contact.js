const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    email:{
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    type: {
        type:String,
        default: 'personal',
        enum: ['personal', "professional"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Contact', ContactSchema);
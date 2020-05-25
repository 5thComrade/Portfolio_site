const mongoose = require('mongoose');
const validator = require('validator');

const Contact = mongoose.model('Contact', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    message: {
        type: String,
        trim: true
    }
})

exports.contact = Contact;
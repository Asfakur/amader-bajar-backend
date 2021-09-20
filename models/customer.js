const Joi = require('joi');
const mongoose = require('mongoose');

//Creating a schema a model
const Customer = new mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 50
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
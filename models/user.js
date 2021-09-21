const Joi = require('joi');
const mongoose = require('mongoose');

const User = new mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
    }
}));

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(2).max(255).required().email(),
        password: Joi.string().min(2).max(255).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;

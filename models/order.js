const Joi = require('joi');
const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            email: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            }
        }),
        required: true
    },
    product: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 2,
                maxlength: 255
            },
            price: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    },
    cost: {
        type: Number,
        min: 0
    },
    orderStatus: {
        type: String,
        minlength: 3,
        maxlength: 50,
        default: 'Pending'        
    }
}));

function validateOrder(order) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        productId: Joi.objectId().required(),
        cost: Joi.number().min(0).required(),
        deliveryAddress: Joi.string().min(2).max(255).required(),
        deliveryDate: Joi.string().min(2).max(255),
        orderStatus: Joi.string().min(2).max(255)       
    });
    return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;
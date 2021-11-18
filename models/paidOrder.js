const Joi = require('joi');
const mongoose = require('mongoose');

const PaidOrder = mongoose.model('PaidOrder', new mongoose.Schema({

    paymentInfo: {
        type: ({
            paymentId: {
                type: String,
                required: true,
            },
            transactionId: {
                type: String,
                required: true,
            },
            deliveryAddress: {
                type: String,
                required: true,
            },
            paidAmount: {
                type: Number,
                required: true,
            },
            currency: {
                type: String,
                required: true,
            }
        }),
        required: true
    },
    customerId: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    pricePerUnit: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    },


}));

function validateOrder(paidOrder) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        productId: Joi.objectId().required(),
        deliveryDate: Joi.string().min(2).max(255),
        orderStatus: Joi.string().min(2).max(255)
    });
    return schema.validate(paidOrder);
}

exports.PaidOrder = PaidOrder;
exports.validate = validateOrder;
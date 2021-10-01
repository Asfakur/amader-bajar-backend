const Joi = require('joi'); //its return a class from joi module so Joi is starts with upper case
const mongoose = require('mongoose');
const { categorySchema } = require('./category');

//creating a schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: categorySchema,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    details: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 510
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    popularity: {
        type: Number,
        required: false,
        min: 0,
        max: 255
    },
    image: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 255
    },
    deleteImage: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 255
    },
    
});

//creating a model
const Product = new mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().min(0).required(),
        details: Joi.string().min(3).max(510).required(),
        categoryId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        popularity: Joi.number().min(0),
        image: Joi.string().min(3).max(255),
        deleteImage: Joi.string().min(3).max(255)
    });
    return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
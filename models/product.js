const Joi = require('joi'); //its return a class from joi module so Joi is starts with upper case
const mongoose = require('mongoose');

//creating a schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
});

//creating a model
const Product = new mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    });
    return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
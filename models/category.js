const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
});

const Category = new mongoose.model('Category', categorySchema);

function validateCategory(category) {
    const schema = Joi.object({
        // _id: Joi.objectId(),
        name: Joi.string()
            .min(3)
            .max(255)
            .required()
    });
    return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;
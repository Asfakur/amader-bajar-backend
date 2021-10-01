const express = require('express');
const router = express.Router(); //this will called the get, post etc method
const { Product, validate } = require('../models/product');
const { Category } = require('../models/category');

//for getting all product
router.get('/', async (req, res) => {
    const products = await Product.find().sort('name');
    res.send(products);
});

//for getting one product by id
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("The product with the given Id is not found");
    res.send(product);
});

//delete a specific element with id
router.delete('/:id', async (req, res) => {
    //if id exits or not
    const product = await Product.findByIdAndRemove(req.params.id)
    if (!product) return res.status(404).send("The product with the given Id is not found");
    res.send(product);
})

//creating new record
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //something new to category
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category.');

    let product = new Product({
        name: req.body.name,
        category: {
            _id: category._id,
            name: category.name
        },
        price: req.body.price,
        details: req.body.details,
        numberInStock: req.body.numberInStock,
        popularity: req.body.popularity,
        image: req.body.image,
        deleteImage: req.body.deleteImage
    });

    product = await product.save();
    res.send(product);
});

//for updating the existing data
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category.');

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: {
            _id: category._id,
            name: category.name
        },
        price: req.body.price,
        details: req.body.details,
        numberInStock: req.body.numberInStock,
        popularity: req.body.popularity,
        image: req.body.image,
        deleteImage: req.body.deleteImage
    }, { new: true });

    if (!product) return res.status(404).send("The product with the given Id is not found");
    res.send(product);
});



module.exports = router;
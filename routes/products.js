const express = require('express');
const router = express.Router(); //this will called the get, post etc method
const { Product, validate } = require('../models/product');

//for getting all product
router.get('/', async(req, res) => {
    const products = await Product.find().sort('name');
    res.send(products);
});

//for getting one product by id
router.get('/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("The product with the given Id is not found");
    res.send(product);
});

//delete a specific element with id
router.delete('/:id', async(req, res) => {
    //if id exits or not
    const product = await Product.findByIdAndRemove(req.params.id)
    if (!product) return res.status(404).send("The product with the given Id is not found");
    res.send(product);
})

//creating new record
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product({ name: req.body.name });
    product = await product.save();
    res.send(product);
});

//for updating the existing data
router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(req.params.id, { name: req.body.name },{
        new: true
    });

    if(!product) return res.status(404).send("The product with the given Id is not found");
    product.name = req.body.name;
    res.send(product);
});



module.exports = router;
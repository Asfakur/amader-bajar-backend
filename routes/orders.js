const express = require('express');
const router = express.Router();
const { Order, validate } = require('../models/order');
const { Customer } = require('../models/customer');
const { Product } = require('../models/product');

router.get('/', async (req, res) => {
    const orders = await Order.find().sort('-dateOut');
    res.send(orders);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { customerId, productId, cost, deliveryAddress} = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const product = await Product.findById(productId);
    if(!product) return res.status(400).send('Invalid product Id.');

    if(product.numberInStock === 0) return res.status(400).send('Product Not in stock');


    let order = new Order({
        customer: {
            _id: customer.id,
            name: customer.name,
            phone: customer.phone,
            email: customer.email
        },
        product: {
            _id: product._id,
            name: product.name,
            price: product.price
        },
        cost: cost,
        deliveryAddress: deliveryAddress
    });

    order = await order.save();

    product.numberInStock--;
    product.save();

    res.send(order);
});

router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).send('The order with the given ID was not found.');

    res.send(order);
});


module.exports = router;
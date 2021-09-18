const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

//get customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer( req.body); //assign frontend data to object variable
    customer = await customer.save(); //save to db
    res.send(customer);
});

router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer) return res.status(404).send('The customer with the given id was not found.');
    res.send(customer);
})

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, (req.body), {
        new: true
    });

    if(!customer) return res.status(404).send('The customer with the given id was not found');
    res.send(customer);
});

router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('The customer with the given id was not found');
    res.send(customer);
});


  

module.exports = router;
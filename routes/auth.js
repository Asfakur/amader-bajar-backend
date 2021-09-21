const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User } = require('../models/user');
// for hashing password
// const _ = require('lodash'); //here _ underscore is the object we use it for convention
// const bcrypt = require('bcrypt'); //hashing object
// var jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or Password');

    const isMatched = (req.body.password === user.password);

    if(!isMatched) return res.status(400).send('Invalid email or Password');

    res.send(isMatched);

    // for hashing password
    // const validPassword = await bcrypt.compare(req.body.password, user.password);
    // if(!validPassword) return res.status(400).send('Invalid email or Password.');

    // const token = jwt.sign({_id: user._id}, 'privateKey');
    // res.send(token);

});



function validate(loginInfo) {
    const schema = Joi.object({
        email: Joi.string().min(2).max(255).required().email(),
        password: Joi.string().min(2).max(255).required()
    });
    return schema.validate(loginInfo);
}

module.exports = router;
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const _ = require('lodash'); //here _ underscore is the object we use it for convention
// const bcrypt = require('bcrypt'); //hashing object https://www.npmjs.com/package/bcrypt

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    await user.save();

    //for hashing add below 
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);

    //token generation for direct register to login
    const token = user.generateAuthToken(); //its needs the userSchema validation

    res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
app.use(express.json()); //it must be needed to enable parsing for getting data from post body
app.use(cors());
require('dotenv').config();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi) //objectId validator https://www.npmjs.com/package/joi-objectid

const products = require('./routes/products'); //load the products module
const home = require('./routes/home');
const customers = require('./routes/customers');
const categories = require('./routes/categories');
const orders = require('./routes/orders');
const users = require('./routes/users');
const auth = require('./routes/auth');


//connect to mongoDB
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jzd7k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost/amader-bajar';
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB..', err.message));


app.use('/', home); //calling the home module
app.use('/api/products', products); //use the products module
app.use('/api/customers', customers);
app.use('/api/categories', categories);
app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`The server is listening at http://localhost:${port}`);
})
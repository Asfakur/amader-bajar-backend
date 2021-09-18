const express = require("express");
const app = express();
const mongoose = require('mongoose');
app.use(express.json()); //it must be needed to enable parsing for getting data from post body
require('dotenv').config();

const products = require('./routes/products'); //load the products module
const home = require('./routes/home');
const customers = require('./routes/customers');


//connect to mongoDB
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jzd7k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost/amader-bajar';
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB..', err.message));


app.use('/', home); //calling the home module
app.use('/api/products', products); //use the products module
app.use('/api/customers', customers);


const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`The server is listening at http://localhost:${port}`);
})
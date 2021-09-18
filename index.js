const express = require("express");
const app = express();
const mongoose = require('mongoose');
app.use(express.json()); //it must be needed to enable parsing for getting data from post body

const products = require('./routes/products'); //load the products module
const home = require('./routes/home');

//connect to mongoDB
mongoose.connect('mongodb://localhost/amader-bajar')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB..', err.message));


app.use('/', home); //calling the home module
app.use('/api/products', products); //use the products module


const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`The server is listening at http://localhost:${port}`);
})
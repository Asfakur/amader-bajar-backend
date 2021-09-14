const express = require("express");
const app = express();
app.use(express.json()); //it must be needed to enable parsing for getting data from post body


const products = require('./routes/products'); //load the products module
const home = require('./routes/home');


app.use('/', home);
app.use('/api/products', products);


app.get('/', (req, res) => {
    res.send("Welcome to amader bajar backend server");
})


const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`The server is listening at http://localhost:${port}`);
})
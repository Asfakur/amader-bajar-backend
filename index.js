const express = require("express");
const app = express();
app.use(express.json()); //it must be needed to enable parsing for getting data from post body
const Joi = require('joi'); //its return a class from joi module so Joi is starts with upper case

const products = [
    { id: 1, name: "Mango" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Apple" },
    { id: 4, name: "Lichi" },
    { id: 5, name: "Jackfruits" }
];

app.get('/', (req, res) => {
    res.send("Welcome to amader bajar backend server");
})

//for getting all product
app.get('/api/products', (req, res) => {
    res.send(products);
});

//for getting one product by id
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send("The product with the given Id is not found");

    res.send(product);
});

//delete a specific element with id
app.delete('/api/products/:id', (req, res) => {
    //if id exits or not
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send("The product with the given Id is not found");

    //deletion part
    const index = products.indexOf(product);
    products.splice(index, 1);
    
    //return the result
    res.send(product);
})

//creating new record
app.post('/api/products', (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = {
        id: products.length + 1,
        name: req.body.name
    };

    products.push(product);
    res.send(product);
});

//for updating the existing data
app.put('/api/products/:id', (req, res) => {
    //if id exits or not
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send("The product with the given Id is not found");
    
    //body contains valid id or not
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //reflect the change in product
    product.name = req.body.name;
    res.send(product);
});

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    });
    return schema.validate(product);
}

const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`The server is listening at http://localhost:${port}`);
})
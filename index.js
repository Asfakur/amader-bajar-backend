const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to amader bajar backend server");
})

const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`The server is listening at http://localhost:${port}`);
})
# amader-bajar-backend
To initialize the app
$ npm init --yes

to install express

$ npm i express


###it is used for auto reaload node server... and to run server in nodemon mode command=> nodemon index.js
$ npm i -g nodemon


app.use(express.json()); //it must be needed to enable parsing for getting data from post body

$ npm install joi
### Joi(https://www.npmjs.com/package/joi) is used to validate input information in server side


const Joi = require('joi'); //its return a class from joi module so Joi is starts with upper case

### MongoDB start by mongoose https://www.npmjs.com/package/mongoose

$ npm install mongoose

### .env to set environment variable  https://www.npmjs.com/package/dotenv

$ npm install dotenv

in index.js file

require('dotenv').config()


### joi-objectid for mongoDB objectId validator https://www.npmjs.com/package/joi-objectid

$ npm install joi-objectid

### lodash for pick up and validation https://www.npmjs.com/package/lodash

$ npm i lodash

### bycrypt is used for password encryption https://www.npmjs.com/package/bcrypt

$ npm install bcrypt

### jsonwebtoken is used to send token from backend to frontend https://www.npmjs.com/package/jsonwebtoken

$ npm install jsonwebtoken

## https://expressjs.com/en/resources/middleware/cors.html
$ npm i cors
` const cors = require('cors');
app.use(cors()) `

//Product model updated

const { isValidObjectId } = require('mongoose');
if (!isValidObjectId(req.params.id)) return res.status(400).send("Object id is wrong");

$ npm install config

before running this we have to pass a key in terminal
$ export amaderBajar_jwtPrivateKey=123

$ npm install uuid

$ npm i stripe

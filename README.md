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
const express = require('express');
const app = express();
const database = require('./utils/database-connection');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

database.authenticate()
    .then(() => console.log("Successfull connection"))
    .catch(() => console.log("Unsuccessfull connection"))

database.sync()
    .then(() => console.log("Successfull syncing"))
    .catch(() => console.log("Unsuccessfull syncing"))   

app.listen(8000);    
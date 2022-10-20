const express = require('express');
const database = require('./config/database-connection');
const app = express();

require('dotenv').config();

database.authenticate()
    .then(() => console.log("Successfull connection"))
    .catch((error) => console.log("Unsuccessfull connection"))

app.listen(8000);    
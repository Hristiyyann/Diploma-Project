const express = require('express');
const app = express();
const database = require('./utils/database-connection');
const models = require('./utils/models');
const authRouter = require('./routes/auth.route');

app.use(express.json());

app.use('/auth', authRouter);

database.authenticate()
    .then(() => console.log("Successfull connection"))
    .catch(() => console.log("Unsuccessfull connection"))

/* database.sync({alter: true})
    .then(() => console.log("Successfull sync"))
    .catch((err) => console.log("Unsuccessfull sync", err)) */

app.listen(8000);    
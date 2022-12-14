require('dotenv').config({path : './.env'});
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const database = require('./utils/database-connection');
const errorLogger = require('./middlewares/errorLogger');
const errorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/auth.route');
const sitterRouter = require('./routes/sitters.route');
const adminRouter = require('./routes/admin.route');
const userRouter = require('./routes/user.route');

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/sitters', sitterRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

database.authenticate()
    .then(() => console.log("Successfull connection"))
    .catch(() => console.log("Unsuccessfull connection"))

app.use(errorLogger);
app.use(errorHandler);

app.listen(8000);    
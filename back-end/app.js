const express = require('express');
const app = express();
const database = require('./utils/database-connection');
const bodyParser = require('body-parser');
const User = require('./models/users.model');
const Sitter = require('./models/sitters.model');
const Booking = require('./models/bookings.model');
const BookingItem = require('./models/booking-items.model');
const Schedule = require('./models/schedules.model'); 
const Pets = require('./models/pets.model');
const SitterCriteria = require('./models/sitter-pet-criteria.model');
const Review = require('./models/reviews.model');
const Service = require('./models/services.model');
const SitterService = require('./models/sitter-services.model');
const UserNotificationsToken = require('./models/user-notifications-token.model');
const UserToken = require('./models/user-token.model'); 

app.use(bodyParser.json());

database.authenticate()
    .then(() => console.log("Successfull connection"))
    .catch(() => console.log("Unsuccessfull connection"))

database.sync({alter: true})
    .then(() => console.log("Successfull sync"))
    .catch((err) => console.log("Unsuccessfull sync", err)) 

app.listen(8000);    
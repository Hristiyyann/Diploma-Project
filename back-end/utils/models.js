const User = require('../models/users.model');
const Sitter = require('../models/sitters.model');
const Booking = require('../models/bookings.model');
const BookingItem = require('../models/booking-items.model');
const Schedule = require('../models/schedules.model'); 
const Pet = require('../models/pets.model');
const SitterCriteria = require('../models/sitter-pet-criteria.model');
const Review = require('../models/reviews.model');
const Service = require('../models/services.model');
const SitterService = require('../models/sitter-services.model');
const UserNotificationsToken = require('../models/user-notifications-token.model');
const UserToken = require('../models/user-tokens.model'); 
const UserRole = require('../models/user-roles.model');

module.exports = 
{
    User, Sitter, Service, SitterService, UserNotificationsToken, UserToken,
    Booking, BookingItem, Schedule, Pet, SitterCriteria, Review, UserRole
};
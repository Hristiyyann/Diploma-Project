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
const UserToken = require('../models/user-tokens.model'); 
const UserRole = require('../models/user-roles.model');

Booking.hasMany(BookingItem, {foreignKey: 'bookingId'});
Service.hasMany(SitterService, {foreignKey: 'serviceId'});
Service.hasMany(BookingItem, {foreignKey: 'serviceId'});
Service.hasMany(Schedule, {foreignKey: 'serviceId'});
Sitter.hasMany(Review, {foreignKey: 'sitterId'});
Sitter.hasMany(SitterService, {foreignKey: 'sitterId'});
Sitter.hasMany(Booking, {foreignKey: 'sitterId'});
Sitter.hasMany(Schedule, {foreignKey: 'sitterId'});
Sitter.hasMany(SitterCriteria, {foreignKey: 'sitterId'});
Pet.hasMany(SitterCriteria, {foreignKey: 'petId'});
User.hasOne(Sitter, {foreignKey: 'userId'});    
User.hasMany(UserRole, {foreignKey: 'userId'});
User.hasMany(UserToken, {foreignKey: 'userId'});
User.hasMany(Review, {foreignKey: 'bookerId'});
User.hasMany(Booking, {foreignKey: 'bookerId'});

Booking.belongsTo(Sitter, {foreignKey: 'sitterId'});
Booking.belongsTo(User, {foreignKey: 'bookerId'}); 
BookingItem.belongsTo(Booking, {foreignKey: 'bookingId'});
BookingItem.belongsTo(Service, {foreignKey: 'serviceId'});
Sitter.belongsTo(User, {foreignKey: 'userId'});
SitterService.belongsTo(Service, {foreignKey: 'serviceId',});
SitterService.belongsTo(Sitter, {foreignKey: 'sitterId'});
SitterCriteria.belongsTo(Sitter, {foreignKey: 'sitterId'});
SitterCriteria.belongsTo(Pet, {foreignKey: 'petId'});
Schedule.belongsTo(Service, {foreignKey: 'serviceId'});
Schedule.belongsTo(Sitter, {foreignKey: 'sitterId'});
Review.belongsTo(Sitter, {foreignKey: 'sitterId'});
Review.belongsTo(User, {foreignKey: 'bookerId'});
UserRole.belongsTo(User, {foreignKey: 'userId'});
UserToken.belongsTo(User, {foreignKey: 'userId'});

module.exports = 
{
    User, Sitter, Service, SitterService, UserToken,
    Booking, BookingItem, Schedule, Pet, SitterCriteria, Review, UserRole
};
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    locationId: String,
    address: String
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;

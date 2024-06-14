const mongoose = require('mongoose');

const hubSchema = new mongoose.Schema({
    address: { type: String, required: true }
});

module.exports = mongoose.model('Hubs', hubSchema);

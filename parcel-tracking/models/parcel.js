const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    parcelId: { type: String, required: true },
    trackingNumber: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    currentLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Hubs', required: true },
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hubs' }],
    expectedDeliveryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parcels', parcelSchema);


// routes/parcelRoutes.js

const express = require('express');
const router = express.Router();
const Parcel = require('../models/Parcel');

router.get('/:trackingNumber', async (req, res) => {
    try {
        const parcel = await Parcel.findOne({ trackingNumber: req.params.trackingNumber })
            .populate('currentLocation')  // Populate currentLocation with Hub details
            .populate('history');         // Populate history with Hub details

        if (!parcel) {
            return res.status(404).json({ msg: 'Parcel not found' });
        }

        res.json(parcel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

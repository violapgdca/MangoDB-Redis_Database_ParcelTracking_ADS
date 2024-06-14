const cron = require('node-cron');
const mongoose = require('mongoose');
const Parcel = require('./models/Parcel');
const Location = require('./models/Location');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Parcel_Tracking';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected for cron jobs'))
    .catch(err => console.log(err));

const updateParcelLocations = async () => {
    try {
        const parcels = await Parcel.find({ status: 'In Transit' });
        const Locations = await Location.find();

        if (Locations.length === 0) {
            console.error('No locations found in the database.');
            return;
        }

        for (let parcel of parcels) {
            const currentLocationIndex = Locations.findIndex(loc => loc.address === parcel.Location);
            const nextLocationIndex = (currentLocationIndex + 1) % Locations.length;
            parcel.Location = Locations[nextLocationIndex].address;
            await parcel.save();
        }
        console.log('Parcel locations updated');
    } catch (err) {
        console.error('Error updating parcel locations:', err);
    }
};

let currentJob = cron.schedule('* * * * *', updateParcelLocations);

module.exports = { updateParcelLocations, currentJob };

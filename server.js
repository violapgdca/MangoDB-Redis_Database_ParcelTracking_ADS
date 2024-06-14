const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80;

// MongoDB Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Parcel_Tracking';
// Collections Names
const parcelsCollectionName = 'parcels';
const hubsCollectionName = 'hubs';

async function connectToDB() {
    const client = new MongoClient(uri);
    await client.connect();
    return client.db(dbName);
}

// Enable CORS
app.use(cors());

// Route to get all parcels data
app.get('/parcels', async (req, res) => {
    try {
        const db = await connectToDB();
        const parcelsCollection = db.collection(parcelsCollectionName);
        const parcelsData = await parcelsCollection.aggregate([
            {
                $lookup: {
                    from: hubsCollectionName,
                    localField: 'currentLocation',
                    foreignField: '_id',
                    as: 'currentLocationDetails'
                }
            },
            {
                $unwind: '$currentLocationDetails'
            },
            {
                $lookup: {
                    from: hubsCollectionName,
                    localField: 'history',
                    foreignField: '_id',
                    as: 'historyDetails'
                }
            }
        ]).toArray();
        res.json(parcelsData);
    } catch (error) {
        console.error('Error fetching parcels data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get parcel data by tracking number
app.get('/parcels/:trackingId', async (req, res) => {
    try {
        const trackingId = req.params.trackingId;
        const db = await connectToDB();
        const parcelsCollection = db.collection(parcelsCollectionName);
        const parcelData = await parcelsCollection.aggregate([
            {
                $match: { trackingNumber: trackingId }
            },
            {
                $lookup: {
                    from: hubsCollectionName,
                    localField: 'currentLocation',
                    foreignField: '_id',
                    as: 'currentLocationDetails'
                }
            },
            {
                $unwind: '$currentLocationDetails'
            },
            {
                $lookup: {
                    from: hubsCollectionName,
                    localField: 'history',
                    foreignField: '_id',
                    as: 'historyDetails'
                }
            }
        ]).toArray();

        if (parcelData.length === 0) {
            res.status(404).json({ error: 'Tracking number not found' });
            return;
        }

        res.json(parcelData[0]);
    } catch (error) {
        console.error('Error fetching parcel data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

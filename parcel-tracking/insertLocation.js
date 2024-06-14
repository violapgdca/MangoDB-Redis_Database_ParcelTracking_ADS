const mongoose = require('mongoose');
const Location = require('./models/Location');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Parcel_Tracking';

const locations = [
    { name: 'Warehouse A', type: 'Warehouse', address: '123 Hauptstraße, Berlin, Germany' },
    { name: 'Distribution Center B', type: 'Distribution Center', address: '456 Musterweg, Hamburg, Germany' },
    { name: 'Shipping Hub C', type: 'Shipping Hub', address: '789 Ludwigstraße, Munich, Germany' },
    { name: 'Destination D', type: 'Delivery Destination', address: '321 Friedrichstraße, Cologne, Germany' },
    { name: 'Warehouse E', type: 'Warehouse', address: '567 Wilhelmstraße, Frankfurt, Germany' },
    { name: 'Distribution Center F', type: 'Distribution Center', address: '890 Goethestraße, Stuttgart, Germany' },
    { name: 'Shipping Hub G', type: 'Shipping Hub', address: '432 Schlossplatz, Düsseldorf, Germany' },
    { name: 'Destination H', type: 'Delivery Destination', address: '654 Breitscheidplatz, Leipzig, Germany' },
    { name: 'Warehouse I', type: 'Warehouse', address: '876 Brandenburger Straße, Dortmund, Germany' },
    { name: 'Distribution Center J', type: 'Distribution Center', address: '210 Alexanderplatz, Essen, Germany' },
    { name: 'Shipping Hub K', type: 'Shipping Hub', address: '987 Schloss Charlottenburg, Bremen, Germany' },
    { name: 'Destination L', type: 'Delivery Destination', address: '543 Neuer Wall, Dresden, Germany' },
    { name: 'Warehouse M', type: 'Warehouse', address: '345 Potsdamer Platz, Hanover, Germany' },
    { name: 'Distribution Center N', type: 'Distribution Center', address: '678 Wittenbergplatz, Nuremberg, Germany' },
    { name: 'Shipping Hub O', type: 'Shipping Hub', address: '901 Karl-Marx-Allee, Duisburg, Germany' },
    { name: 'Destination P', type: 'Delivery Destination', address: '234 Friedrichstraße, Bochum, Germany' },
    { name: 'Warehouse Q', type: 'Warehouse', address: '567 Kurfürstendamm, Wuppertal, Germany' },
    { name: 'Distribution Center R', type: 'Distribution Center', address: '890 Oranienstraße, Bielefeld, Germany' },
    { name: 'Shipping Hub S', type: 'Shipping Hub', address: '123 Schloss Neuschwanstein, Bonn, Germany' },
    { name: 'Destination T', type: 'Delivery Destination', address: '456 Brandenburger Tor, Münster, Germany' }
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');
        await Location.insertMany(locations);
        console.log('Locations inserted');
        mongoose.disconnect();
    })
    .catch(err => console.error(err));

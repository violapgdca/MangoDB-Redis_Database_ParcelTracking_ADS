import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [parcelData, setParcelData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [interval, setInterval] = useState('* * * * *');

    const fetchParcelData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`http://localhost:80/parcels/${trackingNumber}`);
            setParcelData(res.data);
        } catch (err) {
            console.error('Error fetching parcel data:', err);
            setError('Error fetching parcel data');
            setParcelData(null);
        } finally {
            setLoading(false);
        }
    }, [trackingNumber]);

    const updateInterval = async (newInterval) => {
        try {
            await axios.post('http://localhost:5000/api/settings/update-interval', { interval: newInterval });
            setInterval(newInterval);
        } catch (err) {
            console.error('Error updating interval:', err);
            setError('Error updating interval');
        }
    };

    useEffect(() => {
        if (trackingNumber) {
            fetchParcelData();
        }
    }, [fetchParcelData, trackingNumber]);

    return (
        <div>
            <h1>Parcel Tracking Dashboard</h1>
            <input 
                type="text" 
                placeholder="Enter Tracking Number" 
                value={trackingNumber} 
                onChange={(e) => setTrackingNumber(e.target.value)} 
            />
            <button onClick={fetchParcelData}>Track Parcel</button>
            <div>
                <label>Simulation Speed:</label>
                <select value={interval} onChange={(e) => updateInterval(e.target.value)}>
                    <option value="* * * * *">Normal (Every minute)</option>
                    <option value="*/2 * * * *">Faster (Every 2 minutes)</option>
                    <option value="*/5 * * * *">Slower (Every 5 minutes)</option>
                </select>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {parcelData && (
                <div>
                    <p>Parcel ID: {parcelData.parcelId}</p>
                    <p>Status: {parcelData.status}</p>
                    <p>Current Location: {parcelData.currentLocationDetails.Address}</p>
                    
                    {(parcelData.status === 'In Transit' || parcelData.status === 'To Be Delivered') && (
                        <p>Expected Delivery Date: {new Date(parcelData.expectedDeliveryDate).toLocaleDateString()}</p>
                    )}
                    <h3>History:</h3>
                    {parcelData.historyDetails.map((history, index) => (
                        <div key={index}>
                            <p>Location: {history.Address}</p>
                            <p>Date: {new Date(parcelData.updatedAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;

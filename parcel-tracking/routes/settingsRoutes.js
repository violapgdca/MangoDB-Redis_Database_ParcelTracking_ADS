const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const { updateParcelLocations, currentJob } = require('../cronJobs');

let simulationInterval = '* * * * *'; // Use `let` instead of `const`

router.post('/update-interval', (req, res) => {
    const { interval } = req.body;
    if (!interval) {
        return res.status(400).json({ msg: 'Interval is required' });
    }
    simulationInterval = interval; // Reassign the variable
    currentJob.stop(); // Stop the current job
    currentJob = cron.schedule(simulationInterval, updateParcelLocations); // Schedule new job
    res.json({ msg: 'Interval updated', interval: simulationInterval });
});

module.exports = { router, simulationInterval };

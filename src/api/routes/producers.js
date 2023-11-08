const express = require('express');

const Producers = express.Router();

const { getAwardIntervals } = require('../controllers/producersController');

Producers.get('/award-intervals', getAwardIntervals);

module.exports = Producers;

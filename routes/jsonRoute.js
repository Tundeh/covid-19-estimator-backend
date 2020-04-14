/* eslint-disable linebreak-style */

const express = require('express');
const covid19ImpactEstimator = require('../Utils/estimator');
const reqLogger = require('../Utils/logger');
const router = express.Router();

// Estimator in json middleware
const estimatorResponse = (req, res, next) => {
  const startTime = process.hrtime();
  res.status(200).json(covid19ImpactEstimator(req.body));
  reqLogger(req, res, startTime);
};

router.post('/', estimatorResponse);

module.exports = router;

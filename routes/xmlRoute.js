/* eslint-disable linebreak-style */

const express = require('express');
const xml2js = require('xml2js');
const reqLogger = require('../Utils/logger');
const covid19ImpactEstimator = require('../Utils/estimator');

const builder = new xml2js.Builder({
  renderOpts: { pretty: false }
});

const router = express.Router();

// Estimator in xml middleware

const estimatorResponse = (req, res) => {
  const startTime = process.hrtime();
  const estimatorResult = covid19ImpactEstimator(req.body);
  const xml = builder.buildObject(estimatorResult);
  res.setHeader('content-type', 'text/xml');
  res.status(200).send(xml);
  reqLogger(req, res, startTime);

};

router.post('/', estimatorResponse);

module.exports = router;

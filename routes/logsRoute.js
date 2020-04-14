const express = require('express');
const fs = require('fs');
const path = require('path');
const reqLogger = require('../Utils/logger');


const router = express.Router();

// Get logs middleware

const getLogs = (req, res) => {
  try {
    const startTime = process.hrtime();
    const filePath = path.join(__dirname, '..', 'Utils', 'request_logs.txt');
    const data = fs.readFileSync(filePath, 'utf8');
    res.setHeader('content-type', 'text/xml');
    res.status(200).send(data);
    reqLogger(req, res, startTime);
  } catch (error) {

    throw new Error('sorry, there was an issue when reading the logs');

  }
};

// Delete all logs middleware

const deleteLogs = (req, res) => {
  try {
    const startTime = process.hrtime();
    const filePath = path.join(__dirname, '..', 'Utils', 'request_logs.txt');
    fs.unlinkSync(filePath);
    res.status(201).send({ message: 'logs deleted' });
    reqLogger(req, res, startTime);

  } catch (error) {
    throw new Error('unable to delete logs');

  }
};



router.get('/', getLogs);
router.delete('/', deleteLogs);
module.exports = router;
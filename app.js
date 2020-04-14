/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const jsonRoutes = require('./routes/jsonRoute');
const xmlRoutes = require('./routes/xmlRoute');
const logsRoutes = require('./routes/logsRoute');
const app = express();


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/api/v1/on-covid-19', jsonRoutes);
app.use('/api/v1/on-covid-19/json', jsonRoutes);
app.use('/api/v1/on-covid-19/xml', xmlRoutes);
app.use('/api/v1/on-covid-19/logs', logsRoutes);
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: 'Not found'
  })
});

app.use((error, req, res, next) => {
  if (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  }
});

module.exports = app;

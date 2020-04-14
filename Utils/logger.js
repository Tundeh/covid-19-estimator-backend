const path = require('path');
const fs = require('fs');

// Calculate process time

const getExecTime = (startTime) => {
  const timeDiff = process.hrtime(startTime);
  const execTime = (timeDiff[0] * 1000) + (timeDiff[1] / 1000000)
  return execTime;
}

// save log to file middleware

const saveToFile = (data, filename) => {
  fs.appendFile(filename, `${data}\n`, (err) => {
    if (err) {
      throw new Error('The data could not be saved');
    }
  });
};

// Request logger middleware

const reqLogger = (req, res, startTime) => {
  const { method, originalUrl } = req;
  const { statusCode } = res;
  const execTime = getExecTime(startTime);
  const message = `${method}\t\t${originalUrl}\t\t${statusCode}\t\t${execTime} ms`;
  const filePath = path.join(__dirname, 'request_logs.txt');

  saveToFile(message, filePath);


}

module.exports = reqLogger;
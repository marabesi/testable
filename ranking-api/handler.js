const serverless = require('serverless-http');
const app = require('./server');
module.exports.index = serverless(app);
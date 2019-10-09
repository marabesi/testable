var express = require('express');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + '/build', { maxAge: 3600 }));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
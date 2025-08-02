// index.js
// where your node app starts

require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files
app.use(express.static('public'));

// serve HTML
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// simple test route
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// MAIN: whoami API route
app.get('/api/whoami', function (req, res) {
  const ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

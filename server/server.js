const express = require('express');
const path = require('path');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const compression = require('compression');

/* eslint-disable no-console */

const PORT = process.env.PORT || 3000
const app = express();

app.use(compression());
app.use(express.static('dist'));
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

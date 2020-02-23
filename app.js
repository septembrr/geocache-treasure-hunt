// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START gae_node_request_example]
const express = require('express');
const request = require('request');
const fs = require('fs');
var http = require('http');
const https = require('https');
const keys = require('./keys.js');

const app = express();

const key = fs.readFileSync('key.pem');
const cert = fs.readFileSync('cert.pem');

var credentials = {
  key: key,
  cert: cert
};

const server = https.createServer({key: key, cert: cert }, app);

app.use(express.static('public'));

const options = {
  headers: {
      'Authorization': keys.secretKey
  }
};

request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded',
  'Authorization': keys.secretKey
  },
  url:     'https://api.radar.io/v1/geofences',
  body:    "description=DesignHub&tag=venue&externalId=2&type=circle&coordinates=-[121.345396,38.650843]&radius=100"
}, function(error, response, body){
  console.log(body);
});

request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded',
  'Authorization': keys.secretKey
  },
  url:     'https://api.radar.io/v1/geofences',
  body:    "description=AllegiantInnovationCenter&tag=venue&externalId=3&type=circle&coordinates=[-121.389240,38.660538]&radius=100"
}, function(error, response, body){
  console.log(body);
});

// app.get('/', (req, res) => { res.send('this is an secure server') });
// server.listen(3001, () => { console.log('listening on 3001') });

app.get('/', (req, res) => {

  request.get('https://api.radar.io/v1/users',options,function(err,resp,body){
    if(err) {
      console.log(err);
    }
    if(res.statusCode === 200 ) {
      // console.log(resp.body);
    }
    res.sendFile('/Users/emily/Documents/GitHub/geocache-treasure-hunt/views/index.html');
  });


});

// // Start the server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
//   console.log('Press Ctrl+C to quit.');
// });
// // [END gae_node_request_example]

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

module.exports = app;

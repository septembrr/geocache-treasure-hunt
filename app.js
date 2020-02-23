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

const app = express();

app.use(express.static('public'));

const options = {
  headers: {
      'Authorization': 'prj_live_sk_d3a09c4147fc4122f274c78e26e79a47b6ffc2f3'
  }
};

request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded',
  'Authorization': 'prj_live_sk_d3a09c4147fc4122f274c78e26e79a47b6ffc2f3'
  },
  url:     'https://api.radar.io/v1/geofences',
  body:    "description=DesignHub&tag=venue&externalId=2&type=circle&coordinates=[38.650855,-121.345385]&radius=50"
}, function(error, response, body){
  console.log(body);
});

app.get('/', (req, res) => {

  request.get('https://api.radar.io/v1/users',options,function(err,resp,body){
    if(err) {
      console.log(err);
    }
    if(resp.statusCode === 200 ) {
      // console.log(resp.body);
    }
    res.sendFile('/Users/emily/Documents/GitHub/geocache-treasure-hunt/views/index.html');
  });


});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;

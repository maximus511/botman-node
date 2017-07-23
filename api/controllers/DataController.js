'use strict';

var fs = require('fs');
var data = fs.readFileSync('./api/apiData/apiData.json');
var apiData = JSON.parse(data);

/* 
  get required data from api.
*/
exports.getData = function (req, res) {
  var reqData = req.body.result;
  var intent = reqData.metadata.intentName.toLowerCase();
  var responseIntent = intent + '-context';
  var packageDetails = {};
  var office = {};
  console.log(reqData);

  if (intent !== 'contact') {
    var trackingId = reqData.parameters.trackingId;
    packageDetails = apiData.packages.find((obj) => {
      return obj.trackingId === trackingId;
    });
    console.log('response', JSON.stringify(createResponse(packageDetails, intent, responseIntent)));
    res.json(createResponse(packageDetails, intent, responseIntent));
  } else {
    var location = reqData.parameters.location.toLowerCase();
    office = apiData.offices[location];
    console.log(JSON.stringify(createResponse(location, intent, responseIntent)));
    res.json(createResponse(location, intent, responseIntent));
  }
}

function createResponse(obj, intent, responseIntent) {
  var response = {
    "data": {},
    "contextOut": [
      {
        "name": responseIntent,
        "parameters": {
          "package": (intent !== 'contact') ? obj : {},
          "office": (intent === 'contact') ? obj : {}
        }
      }
    ]
  }

  return response;
}
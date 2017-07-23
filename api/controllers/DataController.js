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
    packageDetails = apiData.packages.find((obj) => trackingId === trackingId) || 'Sorry! No such package found. Is that a valid tracking ID?';

    console.log('response', JSON.stringify(createResponse(packageDetails, intent, responseIntent)));
    res.json(createResponse(packageDetails, intent, responseIntent));
  } else {
    var location = reqData.parameters.location.toLowerCase();
    office = apiData.offices[location] || 'There are no offices in your city.';
    console.log(JSON.stringify(createResponse(office, intent, responseIntent)));
    res.json(createResponse(office, intent, responseIntent));
  }
}

function createResponse(obj, intent, responseIntent) {
  var disp = null;

  if (typeof obj === 'string') {
    disp = obj;
  }

  var response = {
    "displayText": disp,
    "data": {},
    "contextOut": [
      {
        "name": responseIntent,
        "parameters": {
          "package": (typeof obj === 'object' && intent !== 'contact') ? obj : null,
          "office": (typeof obj === 'object' && intent === 'contact') ? obj : null
        }
      }
    ]
  }

  return response;
}
'use strict';

var fs = require('fs');
var data = fs.readFileSync('../apiData/apiData.json');
var apiData = JSON.parse(data);

/* 
  get required data from api.
*/
exports.getData = function (req, res) {
  var reqData = req.body.result;
  var trackingId = reqData.trackingId;
  var intent = reqData.metadata.intentName + '-context';

  var package = apiData.reduce((obj, intent) => {
    return obj.trackingId === trackingId;
  });
  console.log(createResponse(package));
  res.JSON(createResponse(package));
}

function createResponse(obj, intent) {
  var response = {
    'data': {},
    'contextOut': [
      {
        'name': intent,
        'parameters': {
          'package': package
        }
      }
    ]
  }

  return response;
}
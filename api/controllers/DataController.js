'use strict';

var fs = require('fs');
var data = fs.readFileSync('./api/apiData/apiData.json');
var apiData = JSON.parse(data);

/* 
  get required data from api.
*/
exports.getData = function (req, res) {
  var reqData = req.body.result;
  console.log(reqData);
  var trackingId = reqData.trackingId;
  var intent = reqData.metadata.intentName + '-context';

  var packageDetails = apiData.reduce((obj, intent) => {
    return obj.trackingId === trackingId;
  });
  console.log(createResponse(packageDetails));

  res.JSON(createResponse(packageDetails));
}

function createResponse(obj, intent) {
  var response = {
    'data': {},
    'contextOut': [
      {
        'name': intent,
        'parameters': {
          'package': obj
        }
      }
    ]
  }

  return response;
}
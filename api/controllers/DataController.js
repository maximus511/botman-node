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
  console.log(req.body.result.parameters);
  var trackingId = req.body.result.parameters.trackingId;
  var intent = req.body.result.metadata.intentName + '-context';

  var packageDetails = apiData.packages.reduce((obj, intent) => {
    return obj.trackingId === trackingId;
  });
  console.log(createResponse(packageDetails));

  res.json(createResponse(packageDetails));
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
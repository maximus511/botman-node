'use strict';

var fs = require('fs');
var data = fs.readFileSync('../apiData/apiData.json');
var apiData = JSON.parse(data);

/* 
  get required data from api.
*/
exports.getData = function (req, res) {
  
}
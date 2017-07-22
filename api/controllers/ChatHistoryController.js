'use strict';


var mongoose = require('mongoose'),
  ChatHistory = mongoose.model('ChatHistory');


/* 
  find chat object by ID. If present, update otherwise, create a new one.
*/
exports.saveChat = function (req, res) {

  var obj = req.body;
  var id = obj.authId;
  delete obj._id;

  if (id) {
    ChatHistory.update({ authId: id }, obj, { upsert: true }, function (err, chat) {
      res.json(chat);
    });
  }
};

/* 
  get a chat history.
  if  authId exists, find by id and return response.
*/

exports.getChat = function (req, res) {
  ChatHistory.findOne({ authId: req.body.authId }, function (err, chat) {
    if (err) {
      res.send(err);
    }
    res.json(chat);
  });
};

exports.clear_history = function (req, res) {
  ChatHistory.remove({
    authId: req.body.authId
  }, function (err, chat) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Chat successfully deleted' });
  });
};

exports.getSample = function (req, res) {
    var data= {
      "speech": "Barack Hussein Obama II was the 44th and current President of the United States.",
      "displayText": "Barack Hussein Obama II was the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ",
      "data": {
      },
      "contextOut": [

      ],
      "source": "DuckDuckGo"
    };
    res.json(data);
};
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
  console.log(req, req.headers);
    var data= {
      "data": {
        lastLocation: "Delhi"
      },
      "contextOut": [{"name":"contact", "lifespan":2, "parameters":{"offices": [
      {
        "address": "Sec-10, Kharghar",
        "poc": "Mr. Mourinho",
        "phone": "+91 22 123456"
      },
      {
        "address": "<br>Sec-11, Goregaon",
        "poc": "Mr. Martial",
        "phone": "+91 22 123456"
      },
      {
        "address": "<br>Sec-22, Powai",
        "poc": "Mr. Henrikh",
        "phone": "+91 22 123456"
      },
      {
        "address": "<br>Opp. DEF, Andheri",
        "poc": "Mr. Cantona",
        "phone": "+91 22 123456"
      }]}}],
      parameters: { location: 'Mumbai' },
      "source": "DuckDuckGo"
    };
    res.json(data);
};
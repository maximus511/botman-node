var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  ChatHistory = require('./api/models/ChatHistoryModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ChatHistorydb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/ChatHistoryRoutes');
routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
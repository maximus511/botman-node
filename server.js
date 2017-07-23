var cors = require('cors');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  ChatHistory = require('./api/models/ChatHistoryModel'),
  bodyParser = require('body-parser');
  
app.use(cors());
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_7rcrjj4s:fq0tkipu75hgi8h7jnpgn22f1b@ds133311.mlab.com:33311/heroku_7rcrjj4s'); 



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/ChatHistoryRoutes');
routes(app);


app.listen(port);


console.log('Botman RESTful API server started on: ' + port);
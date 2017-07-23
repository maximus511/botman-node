'use strict';
module.exports = function (app) {
	var dataGet = require('../controllers/ChatHistoryController');

	// Routes for getting API data.

	app.route('/apiData')
		.post(dataGet.getData);
};
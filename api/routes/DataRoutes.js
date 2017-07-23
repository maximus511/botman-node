'use strict';
module.exports = function (app) {
	var chatHistory = require('../controllers/ChatHistoryController');


	// todoList Routes
	app.route('/save_chat')
		.post(chatHistory.saveChat);


	app.route('/get_chat')
		.post(chatHistory.getChat);

	app.route('/deleteChat:authID')
		.post(chatHistory.clear_history);

	app.route('/getSample')
		.post(chatHistory.getSample);
};
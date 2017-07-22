'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatHistorySchema = new Schema({
	authId: {
		type: String,
		Required: 'The ID of the user.'
	},
	chatHistory: {
		type: Array,
		default: [{
			message: "Hello",
			direction: "in"
		}]
	}
});

module.exports = mongoose.model('ChatHistory', ChatHistorySchema);
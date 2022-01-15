const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		maxlength: [50, 'Title cannot be more than 50 characters'],
	},
	description: {
		type: String,
		required: true,
		maxlength: [200, 'Description cannot be more than 200 characters'],
	},
	imgurl: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
});

module.exports =
	mongoose.models.Article || mongoose.model('Article', ArticleSchema);

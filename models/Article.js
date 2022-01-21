import './User';
import { Schema, models, model } from 'mongoose';

const ArticleSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
			unique: true,
			// maxlength: [50, 'Title cannot be more than 50 characters'],
		},
		description: {
			type: String,
			required: true,
			// maxlength: [200, 'Description cannot be more than 200 characters'],
		},
		imgurl: {
			type: String,
			required: true,
		},
		imgheight: {
			type: Number,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default models.Article || model('Article', ArticleSchema);

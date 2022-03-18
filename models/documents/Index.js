/*
Markdown Document Index




*/
/*
Markdown Document Model
Abbreviated as `MdDoc`





*/
import { Schema, models, model } from 'mongoose';

const modelSchema = new Schema(
	{
		author: {
			email: String,
		},
		selectedVersion: Number,
		title: {
			type: String,
			required: true,
			// maxlength: [50, 'Title cannot be more than 50 characters'],
		},
		description: {
			type: String,
			required: true,
			// maxlength: [200, 'Description cannot be more than 200 characters'],
		},
		headerImage_url: {
			type: String,
			required: true,
		},
		// Not cetain on the use of these booleans now.
		published: {
			type: Boolean,
		},
		archived: Boolean,
	},
	{ timestamps: true }
);

export default models.MdDocIndex || model('mdDocIndex', modelSchema);

/*
Markdown Document Model
Abbreviated as `MdDoc`





*/
import { Schema, models, model } from 'mongoose';

const modelSchema = new Schema(
	{
		// mdDocIndexId: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: 'mdDocIndex',
		// },
		version: Number,
		content: {
			type: String,
		},
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
		author: {
			_id: {
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
			uuid: String,
			email: String,
		},
	},
	{ timestamps: true }
);

export default models.document || model('document', modelSchema);

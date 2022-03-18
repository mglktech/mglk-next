/*
Markdown Document Model
Abbreviated as `MdDoc`





*/
import { Schema, models, model } from 'mongoose';

const modelSchema = new Schema(
	{
		mdDocIndexId: {
			type: Schema.Types.ObjectId,
			ref: 'mdDocIndex',
		},
		version: Number,
		content: {
			type: String,
		},
		author: {
			email: String,
		},
	},
	{ timestamps: true }
);

export default models.MdDoc || model('mdDoc', modelSchema);

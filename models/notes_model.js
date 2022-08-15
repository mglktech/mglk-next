import { Schema, models, model } from 'mongoose';

const NoteSchema = new Schema(
	{
		name: {
			type: String,
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		contents: {
			type: String,
		},
		archived: {
			required: true,
			type: Boolean,
			default: false,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true, versionKey: false }
);

export default models.Note || model('Note', NoteSchema);

import { Schema, models, model } from 'mongoose';

const NoteSchema = new Schema(
	{
		title: {
			type: String,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		smallDescription: {
			type: String,
		},
		contents: {
			type: String,
		},
		labels: {
			type: [String],
		},
		_type: {
			type: String,
			enum: ['note', 'article', 'task'],
		},
		status: {
			type: String,
			// was gonna put Enums, but figured the status is based on the _type given, so Enums are not needed
		},
	},
	{ timestamps: true, versionKey: false }
);

export default models.Note || model('Notepad', NoteSchema);

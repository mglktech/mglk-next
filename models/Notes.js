import { Schema, models, model } from 'mongoose';

const NoteSchema = new Schema(
	{
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		archived: {
			required: true,
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, versionKey: false }
);

export default models.Note || model('Note', NoteSchema);

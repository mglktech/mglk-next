import { Schema, models, model } from 'mongoose';
// import rollback from 'mongoose-rollback';

const optionSubSchema = new Schema({
	_id: false,
	name: {
		type: String,
	},
	description: [String],

	value: {
		type: String,
	},
});

const modelSchema = new Schema(
	{
		title: {
			type: String,
		},
		guid: {
			type: String,
			required: true,
		},
		nexusCompatible: {
			type: Boolean,
		},
		settings: [
			{
				_id: false,
				category: {
					type: String,
				},
				options: [optionSubSchema],
			},
		],
		uploadedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

export default models.ValheimPlugin || model('ValheimPlugin', modelSchema);

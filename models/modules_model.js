import { Schema, models, model } from 'mongoose';

const ModuleSchema = new Schema(
	{
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		icon: {
			type: String,
		},
		path: {
			type: String,
		},
		apiPath: {
			type: String,
		},

		isActive: {
			type: Boolean,
			default: false,
		},
		isPublic: {
			type: Boolean,
			default: false,
		},
		roles: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Roles',
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

export default models.Module || model('Module', ModuleSchema);

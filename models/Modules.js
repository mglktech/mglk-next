import { Schema, models, model } from 'mongoose';

const ModuleSchema = new Schema(
	{
		creator: {
			database_id: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			discord_id: String,
		},
	},
	{}
);

export default models.Module || model('Module', ModuleSchema);

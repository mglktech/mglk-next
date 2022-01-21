import { Schema, models, model } from 'mongoose';

const GuildSchema = new Schema(
	{
		guild_id: {
			type: String,
			required: true,
			unique: true,
		},
		owner: {
			type: String,
		},
		name: {
			type: String,
			required: true,
			// maxlength: [50, 'Title cannot be more than 50 characters'],
		},
		icon: {
			type: String,
		},
		features: [String],
		// modules: [Schema.ObjectId],
	},
	{ timestamps: true }
);

module.exports = models.Guild || model('Guild', GuildSchema);
// export default models.Guild || model('Guild', GuildSchema);

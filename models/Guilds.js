import mongoose from 'mongoose';

const GuildSchema = new mongoose.Schema(
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

module.exports = mongoose.models.Guild || mongoose.model('Guild', GuildSchema);
// export default models.Guild || model('Guild', GuildSchema);

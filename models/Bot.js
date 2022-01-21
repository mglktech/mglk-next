import { Schema, models, model } from 'mongoose';

const BotSchema = new Schema(
	{
		access_token: {
			type: String,
			required: true,
		},
		expires_in: Number,
		refresh_token: {
			type: String,
			required: true,
		},
		scope: {
			type: String,
			required: true,
		},
		token_type: {
			type: String,
			required: true,
		},
		client_id: {
			type: String,
			required: true,
		},
		guild: {},
	},
	{ timestamps: true, strict: true }
);

export default models.Bot || model('Bot', BotSchema);

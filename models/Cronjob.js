import { Schema, models, model } from 'mongoose';

const CronjobSchema = new Schema(
	{
		module: String,
		title: String,
		desc: String,
		exp: String,
		cmd: String,
		data: {},
		enabled: Boolean,
	},
	{}
);

export default models.Cronjob || model('Cronjob', CronjobSchema);

import { Schema, models, model } from 'mongoose';

const _UserSchema = new Schema({}, { timestamps: true, strict: false }); // OLD

const UserSchema = new Schema( // TODO: Not implemented yet.
	{
		uuid: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		userType: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		roles: [
			{
				type: String,
			},
		],
		settings: {
			displayNameOption: {
				type: String,
				enum: [
					'FirstNameOnly',
					'LastNameOnly',
					'FirstNameAndLastName',
					'Custom',
				],
				default: 'FirstNameOnly',
			},
		},
		profile: {
			displayName: {
				type: String,
				default: '',
			},
			avatar: {
				type: String,
			},
		},
	},
	{ timestamps: true, strict: true }
);
export default models.User || model('User', UserSchema);

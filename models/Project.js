import { Schema, models, model } from 'mongoose';
// import rollback from 'mongoose-rollback';

const modelSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: [true, 'Title must be Unique.'],
			// maxlength: [50, 'Title cannot be more than 50 characters'],
		},
		description: {
			type: String,
			required: true,
			// maxlength: [200, 'Description cannot be more than 200 characters'],
		},
		headerImage_url: {
			type: String,
			required: true,
		},
		headerImage_height: {
			type: Number,
		},
		content: {
			type: String,
			required: true,
		},
		published: {
			type: Boolean,
		},
		author: {
			discord: String,
		},
		archived: Boolean,
	},
	{ timestamps: true }
);

// modelSchema.plugin(rollback, {
// 	index: true,
// 	//conn: 'mongodb://localhost/test', required if connection isn't explict
// 	collectionName: 'Project',
// });

export default models.Project || model('Project', modelSchema);

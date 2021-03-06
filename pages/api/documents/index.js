import docModel from '../../../models/documents/Document';
import dbConnect from '../../../lib/dbConnect';
//import { getAuthor } from "../../../lib/auth";
//import docIndexModel from '../../../models/documents/Index';
import { getSession } from 'next-auth/react';
import { ObjectId } from 'mongodb';
import Users from '../../../models/User';
const getAuthor = async (req) => {
	const session = await getSession({ req });
	if (!session) {
		return null;
	}
	// translate session uuid into mongo id
	const user = await Users.findOne({ uuid: session.user.uuid }, { _id: 1 });
	return {
		_id: ObjectId(user._id),
		email: session.user.email,
	};
};

const Page = async (req, res) => {
	const author = await getAuthor(req);
	const {
		query: { published, author_id, version },
		method,
	} = req;

	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				let docs;

				if (published) {
					docs = await docModel.find({ published: true });
				} else {
					//console.log(author);
					docs = await docModel.find({
						author,
					});
				}
				res.status(200).json(docs);
			} catch (error) {
				res.status(422).json({ message: error });
			}
			break;
		case 'POST':
			try {
				let body = req.body;
				body.author = author;
				const doc = await docModel.create(body);
				res.status(201).json(doc);
			} catch (error) {
				console.log(error);
				res.status(422).json({ message: error });
			}
			break;
		default:
			res.status(500).json({ message: 'Internal Server Error (500)' });
			break;
	}
};

const _Page = async (req, res) => {
	const { method } = req;
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const projects = await projectModel.find();
				res.status(200).json({ success: true, data: projects });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const projects = await projectModel.create(req.body);
				res.status(201).json({ success: true, data: projects });
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, data: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

export default Page;

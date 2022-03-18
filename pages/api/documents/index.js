import docModel from '../../../models/documents/Document';
import dbConnect from '../../../lib/dbConnect';
//import docIndexModel from '../../../models/documents/Index';

const Page = async (req, res) => {
	const { method } = req;
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const docs = await docModel.find();
				res.status(200).json(docs);
			} catch (error) {
				res.status(422).json({ message: error });
			}
			break;
		case 'POST':
			try {
				const doc = await docModel.create(req.body);
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

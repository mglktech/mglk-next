//import '../../../models/User';
//import docIndexModel from '../../../models/documents/Index';
import docModel from '../../../models/documents/Document';
import dbConnect from '../../../lib/dbConnect';
import { getSession } from 'next-auth/react';
import { isRole } from '../../../lib/auth';

const Page = async (req, res) => {
	const session = await getSession({ req });
	const {
		query: { id, version },
		method,
	} = req;
	await dbConnect();
	switch (method) {
		case 'GET':
			// Return document index with default selectedVersion document attached
			// if ?version=, return index with populated document matching index id and version.
			try {
				let document = await docModel.findById(id);
				//index.document = await docModel.findOne({ mdDocIndexId: id, version });
				res.status(200).json(document);
			} catch (error) {
				res.status(422).json({ message: error });
			}
			break;
		case 'PUT':
			//
			try {
				//console.log(req.body);
				const updatedDocument = await docModel.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				res.status(201).json(updatedDocument);
			} catch (error) {
				res.status(422).json({ message: error });
			}
			break;
		case 'DELETE':
			// Delete document index and archive it's connected documents.
			try {
			} catch {}
	}
};

export default Page;

//import '../../../models/User';
//import docIndexModel from '../../../models/documents/Index';
import docModel from '../../../models/documents/Document';
import dbConnect from '../../../lib/dbConnect';
import { getSession } from 'next-auth/react';
import { isRole } from '../../../lib/auth';
import { getAuthor } from '../../../utils/author';
const Page = async (req, res) => {
	const author = await getAuthor(req);
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
				let document = await docModel.findOne({ _id: id });

				//index.document = await docModel.findOne({ mdDocIndexId: id, version });
				//console.log(`Query ID:`, id, `Document:`, document);
				if (!document) {
					res.status(422).json({ message: 'No such document' });
					return;
				}
				if (!document.published) {
					if (document.author.email === author.email) {
						res.status(200).json(document);
						return;
					}
					res.status(422).json({ message: 'Not published' });
					return;
				}

				res.status(200).json(document);
			} catch (error) {
				res.status(422).json({ message: error });
			}
			break;
		case 'PUT':
			//
			try {
				let body = req.body;
				body.author = author;
				const updatedDocument = await docModel.findByIdAndUpdate(id, body, {
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

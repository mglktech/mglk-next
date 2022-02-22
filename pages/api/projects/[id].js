//import '../../../models/User';
import projectModel from '../../../models/Project';
import dbConnect from '../../../lib/dbConnect';
import { getSession } from 'next-auth/react';
import { isRole } from '../../../lib/auth';
const Page = async (req, res) => {
	const session = await getSession({ req });
	const {
		query: { id },
		method,
	} = req;

	const sendError = (res, err) => {
		res.status(400).json({ success: false, data: err });
		return;
	};
	const sendData = (res, data) => {
		res.status(200).json({ success: true, data });
		return;
	};
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const project = await projectModel.findById(id);
				const published = !!project.published;
				if (!!!project.published && !isRole(session, 'Owner')) {
					// Only allow the Owner account to get any project
					sendError(res, 'Invalid Permissions');
					return;
				}
				sendData(res, project);
			} catch (error) {
				sendError(res, error);
			}
			break;
		case 'PUT':
			if (!isRole(session, 'Owner')) {
				sendError(res, 'Invalid Permissions');
				return;
			}
			try {
				const project = await projectModel.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				sendData(res, project);
			} catch (error) {
				sendError(res, error);
			}
			break;
		case 'DELETE':
			if (!isRole(session, 'Owner')) {
				sendError(res, 'Invalid Permissions');
				return;
			}
			try {
			} catch (error) {
				sendError(res, error);
			}
			break;
		default:
			sendError(res, 'Unknown Error');
			break;
	}
};

export default Page;

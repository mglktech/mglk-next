import projectModel from '../../../models/Project';
import dbConnect from '../../../lib/dbConnect';
const Page = async (req, res) => {
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
Page.auth = true;
Page.admin = true;
export default Page;

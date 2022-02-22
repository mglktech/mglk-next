import projectModel from '../../../models/Project';
import dbConnect from '../../../lib/dbConnect';
const Page = async (req, res) => {
	const { method } = req;
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const projects = await projectModel.find({ published: true });
				res.status(200).json({ success: true, data: projects });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

export default Page;

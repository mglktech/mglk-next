import User from '../../../../models/User';
import dbConnect from '../../../../lib/dbConnect';
// import { useSession } from 'next-auth/react';
const UserById = async (req, res) => {
	// const { data: session } = useSession();
	const {
		query: { id },
		method,
	} = req;
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const user = await User.findById(
					id,
					'_id username discord_id discriminator image_url'
				);

				if (!user) {
					return res.status(400).json({ success: false });
				}

				res.status(200).json({ success: true, data: user });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		// case 'PUT':
		// 	try {
		// 		const user = await User.findByIdAndUpdate(id, req.body, {
		// 			new: true,
		// 			runValidators: true,
		// 		});

		// 		if (!user) {
		// 			return res.status(400).json({ success: false });
		// 		}

		// 		res.status(200).json({ success: true, data: user });
		// 	} catch (error) {
		// 		res.status(400).json({ success: false });
		// 	}
		// 	break;
		// case 'DELETE':
		// 	try {
		// 		const deletedUser = await User.deleteOne({ _id: id });

		// 		if (!deletedUser) {
		// 			return res.status(400).json({ success: false });
		// 		}

		// 		res.status(200).json({ success: true, data: {} });
		// 	} catch (error) {
		// 		res.status(400).json({ success: false });
		// 	}
		// 	break;
		// default:
		// 	res.status(400).json({ success: false });
		// 	break;
	}
};

export default UserById;

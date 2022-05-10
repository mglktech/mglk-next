import Users from '../../../../models/User';
import dbConnect from '../../../../lib/dbConnect';
import { getSession } from 'next-auth/react';
const UserById = async (req, res) => {
	const { user } = await getSession({ req });
	const {
		query: { uuid },
		method,
	} = req;

	console.log('Session: ', user);
	await dbConnect();
	switch (method) {
		case 'GET': // Should ONLY respond with public data
			try {
				const user = await Users.findOne(
					{ uuid: uuid },
					'-_id uuid ' // displayName
				);

				if (!user) {
					return res
						.status(400)
						.json({ success: false, message: 'No User Found' });
				}

				res.status(200).json({ success: true, data: user });
			} catch (error) {
				res.status(400).json({ success: false, mesage: error });
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
		case 'PUT': {
			try {
				const ProtectedKeys = ['uuid', '_id', 'email', 'password', 'roles']; // Some user fields should not be updated. ever.
				const userInfo = Object.keys(req.body)
					.filter((key) => !ProtectedKeys.includes(key))
					.reduce((obj, key) => {
						obj[key] = req.body[key];
						return obj;
					}, {});
				console.log(`users/${user.uuid}/`, userInfo);
				// Find User's uuid from session?
				// Find One and Update based on UUID
				// Prevent users from changing their UUID or Email address.
				res.status(200).json(req.body);
			} catch (err) {
				res.status(500).json({ message: 'Internal Server Error', error: err });
			}
		}
	}
};

export default UserById;

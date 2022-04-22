import { getSession } from 'next-auth/react';
import { ObjectId } from 'mongodb';
import Users from '../../../models/User';
export const getAuthor = async (req) => {
	const session = await getSession({ req });
	if (!session) {
		return null;
	}

	return {
		_id: await MongoId(session.user.uuid),
		email: session.user.email,
	};
};
export const MongoId = async (uuid) => {
	const user = await Users.findOne({ uuid }, { _id: 1 });
	return ObjectId(user._id);
};

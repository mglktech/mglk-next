import { getSession } from 'next-auth/react';
import { ObjectId } from 'mongodb';
export const getAuthor = async (req) => {
	const session = await getSession({ req });
	if (!session) {
		return null;
	}
	return {
		_id: ObjectId(session.user._id),
		email: session.user.email,
	};
};

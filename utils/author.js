import { getSession } from 'next-auth/react';
export const getAuthor = async (req) => {
	const session = await getSession({ req });
	if (!session) {
		return null;
	}
	return {
		_id: session.user._id,
		email: session.user.email,
	};
};

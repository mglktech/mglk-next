/*
/api/users/me

Delivers data based on the user's session.

First, collect the users session data on page load and send it to the database connection.
Then retrieve the user's data from the database and send it to the client using a Prop

*/

import {
	getProviders,
	signIn,
	getSession,
	useSession,
	getCsrfToken,
} from 'next-auth/react';

const index = async (req, res) => {
	const session = await getSession({ req });
	if (!session) {
		res.status(404).json({ err: true });
		return;
	}
	res.status(200).json(session);
};
export default index;

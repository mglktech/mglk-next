import { getSession } from 'next-auth/react';
import Bots from '../../../models/Bot';
import dbConnect from '../../../lib/dbConnect';
const Get = async (req, res) => {
	await dbConnect();
	const session = await getSession({ req });
	if (session.user.owner) {
		const bot = await Bots.findOne();
		if (bot) {
			res.status(200).json({ success: true, data: bot });
			return;
		}
		res.status(200).json({ success: false });
		//console.log('Session', JSON.stringify(session, null, 2));
		return;
	}
	res.status(404).json({ success: false });
	return;
};
export default Get;

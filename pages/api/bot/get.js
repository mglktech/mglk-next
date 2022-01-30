import { getSession } from 'next-auth/react';
import Bots from '../../../models/Bot';
const Get = async (req, res) => {
	const session = await getSession({ req });
	if (session.user.owner) {
		const bot = await Bots.findOne();
		res.status(200).json({ success: true, data: bot });
		//console.log('Session', JSON.stringify(session, null, 2));
		return;
	}
	res.status(404).json({ success: false });
	return;
};
export default Get;

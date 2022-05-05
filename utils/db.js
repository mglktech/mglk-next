// DATABASE UTILITIES
// Import to collect specific data from the database.
import Users from '../models/User';
import dbConnect from '../lib/dbConnect';

export const fetchUser = async (uuid) => {
	await dbConnect();
	return await Users.findOne({ uuid }, { password: 0, _id: 0 }).lean();
};

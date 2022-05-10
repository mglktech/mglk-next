import { hashPassword } from '../../../lib/auth';
import Users from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';
import { v4 as uuidv4 } from 'uuid';
const newUser = (options) => {};

const handler = async (req, res) => {
	const { method } = req;

	const { firstName, lastName, password } = req.body;
	let { email } = req.body;
	email = email?.toLowerCase();
	if (
		!email ||
		!email.includes('@') ||
		!password ||
		password.trim().length < 7
	) {
		res.status(422).json({
			message:
				'Invalid input - password should also be at least 7 characters long.',
		});
		return;
	}
	await dbConnect();
	switch (method) {
		case 'POST':
			try {
				const existingUser = await Users.findOne({ email: email });
				if (existingUser) {
					res
						.status(422)
						.json({ message: 'User with that email address exists already!' });
					return;
				}
				const hashedPassword = await hashPassword(password);
				const uuid = uuidv4();
				const newUser = new Users({
					uuid,
					firstName,
					lastName,
					email,
					password: hashedPassword,
				});
				await newUser.save();
				res.status(201).json({ message: 'Created User!' });
				return;
			} catch (error) {
				res.status(500).json({ message: 'Internal Server Error', error });
			}
	}
};

async function _handler(req, res) {
	if (req.method !== 'POST') {
		return;
	}

	const data = req.body;
	const { email, password } = data;

	if (
		!email ||
		!email.includes('@') ||
		!password ||
		password.trim().length < 7
	) {
		res.status(422).json({
			message:
				'Invalid input - password should also be at least 7 characters long.',
		});
		return;
	}

	const client = await dbConnect();

	const db = client.db();

	const existingUser = await Users.findOne({ email: email });

	if (existingUser) {
		res.status(422).json({ message: 'User exists already!' });
		client.close();
		return;
	}

	const hashedPassword = await hashPassword(password);

	const result = await Users.findOneAndUpdate(
		{
			email: email,
			password: hashedPassword,
		},
		{ new: true, runValidators: true }
	);

	res.status(201).json({ message: 'Created user!' });
	client.close();
}

export default handler;

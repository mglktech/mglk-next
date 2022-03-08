import { hashPassword } from '../../../lib/auth';
import Users from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';

const handler = async (req, res) => {
	const {
		query: { id },
		method,
	} = req;
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
	await dbConnect();
	switch (method) {
		case 'POST':
			try {
				const existingUser = await Users.findOne({ email: email });
				if (existingUser) {
					res.status(422).json({ message: 'User exists already!' });
					return;
				}
				const hashedPassword = await hashPassword(password);
				const newUser = new Users({ email: email, password: hashedPassword });
				await newUser.save();
				res.status(201).json({ message: 'Created User!' });
				return;
			} catch {
				res.status(500).json({ message: 'Internal Server Error' });
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

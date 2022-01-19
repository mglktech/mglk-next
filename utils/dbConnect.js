import mongoose from 'mongoose';

const connection = {};

function dbConnect() {
	if (connection.isConnected) {
		return;
	}

	const db = mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	connection.isConnected = db.connections ? [0].readyState : null;
}

export default dbConnect;

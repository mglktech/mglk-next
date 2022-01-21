import { connect } from 'mongoose';

let connection;
const uri = process.env.MONGODB_URI;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
if (!uri) {
	throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	if (!global.mongooseConnection) {
		global.mongooseConnection = connect(uri, options);
		//client = new MongoClient(uri, options);
		//global._mongoClientPromise = client.connect();
	}
	connection = global.mongooseConnection;
} else {
	// In production mode, it's best to not use a global variable.
	connection = connect(uri, options);
}

export default connection;

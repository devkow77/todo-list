import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		if (mongoose.connection.readyState === 0) {
			await mongoose.connect(process.env.MONGO_URI || '', {
				dbName: 'todolist',
			});
			console.info('db connected');
		}
	} catch (error) {
		console.error(error);
	}
};

export default connectDB;

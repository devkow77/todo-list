import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: [true, 'name of task is required'],
		unique: true,
	},
	complited: {
		type: Boolean,
		default: false,
	},
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;

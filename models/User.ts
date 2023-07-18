import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		minlength: 8,
		maxlength: 20,
		unique: true,
		required: [true, 'username is required'],
	},
	email: {
		type: String,
		lowercase: true,
		match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'please provide a valid email address'],
		required: [true, 'email is required'],
	},
	password: {
		type: String,
		minlength: 6,
		maxlength: 18,
		required: [true, 'password is required'],
	},
});

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(this.password || '', salt);
	this.password = hashedPassword;
});

UserSchema.methods.comparePasswords = async function (password: string) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

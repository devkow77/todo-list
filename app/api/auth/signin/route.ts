import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import connectDB from '@/db/connect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

/* 
	method: POST
	function: login to an existing account in the database
	steps: 
	- connect to database
	- find user with provided email
	- if user exist compare passwords
	- create jwt which is stored in localstorage
*/

export async function POST(req: Request) {
	await connectDB();
	const body = await req.json();

	const findUser = await User.findOne({ email: body.email });
	if (!findUser) {
		return NextResponse.json({ message: 'user with provided username not exist' }, { status: StatusCodes.BAD_REQUEST });
	}

	const correctPassword = await findUser.comparePasswords(body.password);
	if (!correctPassword) {
		return NextResponse.json({ message: 'password is not correct' }, { status: StatusCodes.CONFLICT });
	}

	const token = jwt.sign({ id: findUser._id, username: findUser.username, email: findUser.email }, process.env.JWT_SECRET || '', { expiresIn: process.env.JWT_LIFETIME });

	return NextResponse.json({ token }, { status: StatusCodes.OK });
}

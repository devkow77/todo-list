import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import connectDB from '@/db/connect';
import User from '@/models/User';

/* 
	method: POST
	function: login to an existing account in the database
	steps: 
	- connect to database
	- check if already exist user with provided email or username
	- if not create new user account in mongodb
*/

export async function POST(req: Request) {
	const body = await req.json();
	await connectDB();

	const usernameExist = await User.findOne({ username: body.username });
	if (usernameExist) {
		return NextResponse.json({ message: 'user with provided username already exist' }, { status: StatusCodes.CONFLICT });
	}
	const emailExist = await User.findOne({ email: body.email });
	if (emailExist) {
		return NextResponse.json({ message: 'user with provided email already exist' }, { status: StatusCodes.CONFLICT });
	}

	await User.create(body);
	return NextResponse.json({ message: 'new user has been successfully created' }, { status: StatusCodes.CREATED });
}

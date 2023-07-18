import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import connectDB from '@/db/connect';
import Task from '@/models/Task';
import checkAuthorization from '../../../helpers/authorization';

/* 
	method: GET
	function: finding all tasks logged user
	steps: 
	- connect to database
	- check if jwt token exist if not return error message
	- find all user tasks
	- return tasks
*/

export async function GET(req: Request) {
	await connectDB();

	const decoded = checkAuthorization(req);
	if (!decoded) {
		return NextResponse.json({ message: 'no authorization token' }, { status: StatusCodes.BAD_REQUEST });
	}

	const findTasks = await Task.find({ userId: decoded.id });
	return NextResponse.json({ findTasks, decoded }, { status: StatusCodes.OK });
}

/* 
	method: POST
	function: create new task and return all user tasks
	steps: 
	- connect to database
	- create new task and find all user tasks
	- return tasks
*/

export async function POST(req: Request) {
	const body = await req.json();
	await connectDB();

	const decoded = checkAuthorization(req);
	if (!decoded) {
		return NextResponse.json({ message: 'no authorization token' }, { status: StatusCodes.BAD_REQUEST });
	}

	await Task.create(body);
	const findTasks = await Task.find({ userId: decoded.id });
	return NextResponse.json({ findTasks, message: 'task has been created' }, { status: StatusCodes.CREATED });
}

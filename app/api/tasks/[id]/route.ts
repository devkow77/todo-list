import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import connectDB from '@/db/connect';
import Task from '@/models/Task';
import checkAuthorization from '../../../../helpers/authorization';

/* 
	method: GET
	function: get informations about single task
	steps: 
	- connect to database
	- decode token from authorization
	- delete task
	- return tasks
*/

export async function GET(req: Request, { params }: { params: { id: string } }) {
	await connectDB();
	const { id } = params;

	const findTask = await Task.findOne({ _id: id });
	return NextResponse.json({ findTask }, { status: StatusCodes.OK });
}

/* 
	method: DELETE
	function: delete selected task
	steps: 
	- connect to database
	- decode token from authorization
	- delete task
	- return tasks
*/

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	await connectDB();
	const { id } = params;

	const decoded = checkAuthorization(req);
	if (!decoded) {
		return NextResponse.json({ message: 'no authorization token' }, { status: StatusCodes.BAD_REQUEST });
	}

	await Task.findOneAndDelete({ _id: id });
	const findTasks = await Task.find({ userId: decoded.id });
	return NextResponse.json({ findTasks, message: 'task has been deleted' }, { status: StatusCodes.OK });
}

/* 
	method: PATCH
	function: update task name or complited status
	steps: 
	- connect to database
	- update name of task or complited status
*/

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
	await connectDB();
	const { id } = params;
	const body = await req.json();

	await Task.findOneAndUpdate({ _id: id }, { name: body.name, complited: body.complited });
	return NextResponse.json({ message: 'task has been updated' }, { status: StatusCodes.OK });
}

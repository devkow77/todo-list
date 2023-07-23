'use client';

import React, { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { notifyError, notifySuccess } from '@/helpers/notify';
import { useRouter } from 'next/navigation';

import { loadTasks, createTask, deleteTask } from '../../helpers/request';

const schema = yup.object().shape({
	name: yup.string().required('name of task is required'),
	complited: yup.boolean().default(false).required(),
	userId: yup.string(),
});

interface tasksInterface {
	_id?: string;
	name: string;
	complited: boolean;
	userId: string;
}

const tasksInitialState: tasksInterface = {
	name: '',
	complited: false,
	userId: '',
};

interface userInterface {
	id: string;
	username: string;
	email: string;
}

const userInitialState: userInterface = {
	id: '',
	username: '',
	email: '',
};

const Tasks = () => {
	const [tasks, setTasks] = useState<tasksInterface[]>([tasksInitialState]);
	const [task, setTask] = useState<tasksInterface>(tasksInitialState);
	const [user, setUser] = useState<userInterface>(userInitialState);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	const router = useRouter();

	// fetching data to show on page
	useEffect(() => {
		const token = localStorage.getItem('token');
		loadTasks(token)
			.then((response) => {
				if (!response) {
					router.push('/');
					return;
				}
				const {
					findTasks,
					decoded: { id, username, email },
				} = response;
				setTasks(findTasks);
				setUser({
					id,
					username,
					email,
				});
			})
			.catch((error) => console.log(error));
	}, []);

	// create task function
	const handleCreateTask = () => {
		const token = localStorage.getItem('token');
		createTask(token, task, user)
			.then((response) => {
				if (!response) return;
				const { findTasks, message } = response;
				notifySuccess(message);
				setTasks(findTasks);
				setTask(tasksInitialState);
			})
			.catch((error) => console.log(error));
	};

	// delete task function
	const handleDeleteTask = (id: string) => {
		const token = localStorage.getItem('token');
		deleteTask(token, id)
			.then((response) => {
				if (!response) return;
				const { findTasks, message } = response;
				setTasks(findTasks);
				notifySuccess(message);
			})
			.catch((error) => console.log(error));
	};

	// logout user function
	const handleLogoutUser = () => {
		localStorage.removeItem('token');
		router.push('/signin');
	};

	return (
		<article className="min-h-[100vh] bg-violet-950 py-8 lg:text-lg">
			<div className="container">
				<nav className="flex flex-col gap-4 mb-20 sm:flex-row sm:items-center sm:justify-between lg:px-8">
					<div>
						<h2 className="font-semibold">{user.username}</h2>
						<h2 className="font-semibold">{user.email}</h2>
					</div>
					<button onClick={handleLogoutUser} className="px-4 py-2 text-center rounded-3xl bg-violet-500 hover:bg-violet-700 duration-150 sm:px-12">
						<p>log out</p>
					</button>
				</nav>
				<header>
					<div className="mb-4 mx-auto md:text-center">
						<h1 className="text-3xl font-extrabold mb-2 lg:text-5xl lg:mb-4">TASK MANAGMENT</h1>
						<p>{tasks.length ? 'Create Your Next Task' : 'Create Your First Task'}</p>
					</div>
					<div className="mb-8">
						<form method="POST" onSubmit={handleSubmit(handleCreateTask)} className="flex flex-col gap-8">
							<input
								type="text"
								placeholder="task name"
								className="bg-black w-full max-w-xl bg-opacity-10 rounded-3xl text-center py-2 mx-auto"
								{...register('name')}
								value={task.name}
								onChange={(e) => setTask({ ...task, name: e.target.value })}
							/>
							<p className="text-sm max-w-xl md:text-base opacity-40 mx-auto">{errors.name?.message}</p>
							<div className="flex flex-col items-center gap-4">
								<button type="submit" className="w-full max-w-xl py-2 rounded-3xl bg-violet-600 hover:bg-violet-800 duration-150">
									add task
								</button>
								<button type="reset" onClick={() => setTask(tasksInitialState)} className="w-full max-w-xl py-2 rounded-3xl bg-violet-500 hover:bg-violet-700 duration-150">
									clear
								</button>
							</div>
						</form>
					</div>
					<div>
						<h3 className="text-center font-semibold mb-8">{tasks.length ? `number of tasks: ${tasks.length}` : 'no task'}</h3>
						<div className="max-w-4xl mx-auto space-y-2 lg:space-y-4">
							{task &&
								tasks.map(({ _id, name, complited }, index) => (
									<div key={index} className="flex items-center justify-between px-4 py-2 bg-black bg-opacity-10 rounded-3xl">
										<p className={`${complited ? 'line-through' : ''}`}>{name}</p>
										<div className="flex gap-2">
											<MdEdit className="scale-125 cursor-pointer" onClick={() => router.push(`/tasks/${_id}`)} />
											<MdDelete className="scale-125 cursor-pointer" onClick={() => handleDeleteTask(_id || '')} />
										</div>
									</div>
								))}
						</div>
					</div>
				</header>
			</div>
		</article>
	);
};

export default Tasks;

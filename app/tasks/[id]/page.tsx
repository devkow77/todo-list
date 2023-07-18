'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { notifySuccess } from '@/helpers/notify';

const schema: yup.ObjectSchema<taskInterface> = yup.object().shape({
	name: yup.string().required('task name is required'),
	complited: yup.boolean().default(false).required(),
});

interface taskInterface {
	name: string;
	complited: boolean;
}

const taskInitialState: taskInterface = {
	name: '',
	complited: false,
};

const TaskEdit = ({ params }: { params: { id: string } }) => {
	const [task, setTask] = useState<taskInterface>(taskInitialState);
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const { id } = params;
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	useEffect(() => {
		getTask();
	}, []);

	const getTask = async () => {
		try {
			const response = await fetch(`/api/tasks/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const { findTask } = await response.json();
			if (!response.ok) {
				console.log('Something went wrong with getting task');
			}
			setTask({
				name: findTask.name,
				complited: findTask.complited,
			});
			console.log(findTask.complited);
		} catch (error) {
			console.log(error);
		}
	};

	const updateTask = async () => {
		try {
			const response = await fetch(`/api/tasks/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...task }),
			});
			const { message } = await response.json();
			if (!response.ok) {
				console.log('Something went wrong with updating');
			}
			notifySuccess(message);
			setTask(taskInitialState);
			setIsUpdated(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<article className="min-h-[100vh] bg-violet-950 flex items-center justify-center lg:text-lg">
			<div className="container max-w-5xl text-center">
				<section className="px-4 py-8 bg-black bg-opacity-10 rounded-3xl flex flex-col space-y-4 lg:py-16 lg:space-y-8">
					<div>
						<h1 className="text-3xl font-extrabold mb-4 lg:text-5xl">Edit Task</h1>
						<p className="font-semibold">id: {id}</p>
						<p className="font-semibold">
							Current task name: <span className="text-violet-300">{task.name}</span>
						</p>
					</div>
					<form method="POST" className="space-y-8" onSubmit={handleSubmit(updateTask)}>
						<div>
							<input
								type="text"
								placeholder="new task name"
								className="bg-black w-full max-w-xl bg-opacity-10 rounded-3xl text-center py-2 mb-2 lg:mb-4"
								{...register('name')}
								value={task.name}
								onChange={(e) => setTask({ ...task, name: e.target.value })}
							/>
							<label className="flex items-center justify-center gap-4">
								<p>complited</p>
								<input type="checkbox" {...register('complited')} value={String(task.complited)} onChange={(e) => setTask({ ...task, complited: e.target.checked })} />
							</label>
							<p className="text-sm max-w-xl md:text-base opacity-40 mx-auto mt-4">{errors.name?.message}</p>
						</div>
						<div className="space-y-2 lg:space-y-4">
							<button type="submit" className="w-full max-w-xl rounded-3xl text-center py-2 bg-violet-600 hover:bg-violet-800 duration-150">
								save changes
							</button>
							<button className="w-full max-w-xl rounded-3xl text-center py-2 bg-violet-500 hover:bg-violet-700 duration-150" onClick={() => router.push('/tasks')}>
								{isUpdated ? 'back to task managment' : 'leave without saving'}
							</button>
						</div>
					</form>
				</section>
			</div>
		</article>
	);
};

export default TaskEdit;

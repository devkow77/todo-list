'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { notifySuccess, notifyError } from '@/helpers/notify';

const schema: yup.ObjectSchema<userInterface> = yup.object().shape({
	username: yup.string().min(8, 'at least 8 characters in username').max(20, 'max 20 characters in username').required('username is required'),
	email: yup.string().email('not valid email').required('email is required'),
	password: yup.string().min(6, 'at least 6 characters in password').max(18, 'max 18 characters in password').required('password is required'),
});

interface userInterface {
	username: string;
	email: string;
	password: string;
}

const userInitialState: userInterface = {
	username: '',
	email: '',
	password: '',
};

const SignUp = () => {
	const [user, setUser] = useState<userInterface>(userInitialState);
	const [isUser, setIsUser] = useState<boolean>(false);

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitted },
	} = useForm<userInterface>({ resolver: yupResolver(schema) });

	const createUser = async () => {
		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...user }),
			});
			const { message } = await response.json();
			if (!response.ok) {
				return notifyError(message);
			}
			notifySuccess(message);
			setIsUser(true);
			setUser(userInitialState);
		} catch (error) {
			console.log(error);
		}
	};

	const getErrorMessages = () => {
		return Object.values(errors)
			.map((error) => error?.message)
			.join(' and ');
	};

	return (
		<article className="min-h-[100vh] bg-violet-950 flex items-center justify-center">
			<div className="container text-center md:text-lg">
				<section>
					<h1 className="text-4xl font-extrabold mb-8 md:text-5xl">SIGN UP</h1>
					<div>
						<form method="POST" onSubmit={handleSubmit(createUser)}>
							<div className="flex flex-col items-center gap-4 mb-8">
								<input
									type="text"
									placeholder="username"
									className={`${isSubmitted ? (errors.username ? 'bg-red-500 bg-opacity-20' : 'bg-green-500 bg-opacity-20') : 'bg-black'} w-full max-w-xl bg-opacity-10 rounded-3xl text-center py-2`}
									{...register('username')}
									value={user.username}
									onChange={(e) => setUser({ ...user, username: e.target.value })}
								/>
								<input
									type="email"
									placeholder="email@example.com"
									className={`${isSubmitted ? (errors.email ? 'bg-red-500 bg-opacity-20' : 'bg-green-500 bg-opacity-20') : 'bg-black'} w-full max-w-xl bg-opacity-10 rounded-3xl text-center py-2`}
									{...register('email')}
									value={user.email}
									onChange={(e) => setUser({ ...user, email: e.target.value })}
								/>
								<input
									type="password"
									placeholder="password"
									className={`${isSubmitted ? (errors.password ? 'bg-red-500 bg-opacity-20' : 'bg-green-500 bg-opacity-20') : 'bg-black'} w-full max-w-xl bg-opacity-10 rounded-3xl text-center py-2`}
									{...register('password')}
									value={user.password}
									onChange={(e) => setUser({ ...user, password: e.target.value })}
								/>
								<p className="text-sm max-w-xl md:text-base opacity-40">{getErrorMessages()}</p>
							</div>
							<div className="flex flex-col items-center gap-4 md:gap-8">
								<button type="submit" className="w-full max-w-xl py-2 rounded-3xl bg-violet-600 hover:bg-violet-800 duration-150">
									create user
								</button>
								<Link href={`${isUser ? '/signin' : '/'}`}>
									<p>{isUser ? 'go to login' : 'back to menu'}</p>
								</Link>
							</div>
						</form>
					</div>
				</section>
			</div>
		</article>
	);
};

export default SignUp;

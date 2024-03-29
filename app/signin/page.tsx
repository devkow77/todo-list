'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../helpers/request';
import { notifyError } from '@/helpers/notify';

const schema: yup.ObjectSchema<userInterface> = yup.object().shape({
	email: yup.string().email('not valid email').required('email is required'),
	password: yup.string().min(6, 'at least 6 characters in password').max(18, 'max 18 characters in password').required('password is required'),
});

interface userInterface {
	email: string;
	password: string;
}

const userInitialState: userInterface = {
	email: '',
	password: '',
};

const SignIn = () => {
	const [user, setUser] = useState<userInterface>(userInitialState);
	const router = useRouter();

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitted },
	} = useForm<userInterface>({ resolver: yupResolver(schema) });

	const onSubmit = () => {
		loginUser(user)
			.then((token) => {
				if (token !== undefined && typeof window !== undefined) {
					localStorage.setItem('token', token);
					router.push('/tasks');
				}
			})
			.catch((error) => console.log(error));
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
					<h1 className="text-4xl font-extrabold mb-8 md:text-5xl">SIGN IN</h1>
					<div>
						<form method="POST" onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col items-center gap-4 mb-8">
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
									login
								</button>
								<Link href={'/'}>
									<p>back to menu</p>
								</Link>
							</div>
						</form>
					</div>
				</section>
			</div>
		</article>
	);
};

export default SignIn;

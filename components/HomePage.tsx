'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
	const [token, setToken] = useState<string | boolean>();
	useEffect(() => {
		const token = localStorage.getItem('token') || false;
		setToken(token);
	}, []);

	return (
		<header className="min-h-[100vh] bg-violet-950 flex items-center justify-center">
			<div className="container">
				<section className="text-center md:text-lg">
					<div className="mb-8 md:space-y-2 xl:space-y-4">
						<h1 className="text-4xl font-extrabold md:text-5xl">TODO LIST</h1>
						<p className="font-semibold">
							Welcome {token ? 'again!' : 'first time!'} <br />
							login status: <span className={token ? 'text-green-500' : 'text-red-600'}>{token ? 'active user' : 'no active'}</span>
						</p>
					</div>
					<div className="flex flex-col items-center gap-4">
						<Link href={token ? '/tasks' : '/signup'} className={`${token ? 'bg-indigo-600 hover:bg-indigo-800' : 'bg-violet-600 hover:bg-violet-800'} w-full max-w-lg px-4 py-2 rounded-3xl duration-150`}>
							<p>{token ? 'show tasks' : 'create user'}</p>
						</Link>
						<Link href={token ? '/signup' : '/signin'} className={`${token ? 'bg-indigo-600 hover:bg-indigo-800' : 'bg-violet-600 hover:bg-violet-800'} w-full max-w-lg px-4 py-2 rounded-3xl duration-150`}>
							<p>{token ? 'register / login' : 'login'}</p>
						</Link>
					</div>
				</section>
			</div>
		</header>
	);
};

export default HomePage;

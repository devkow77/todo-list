import Link from 'next/link';

export default async function Home() {
	return (
		<header className="min-h-[100vh] bg-violet-950 flex items-center justify-center">
			<div className="container">
				<section className="text-center md:text-lg">
					<div className="mb-8 md:space-y-2 xl:space-y-4">
						<h1 className="text-4xl font-extrabold md:text-5xl">TODO LIST</h1>
						<p className="font-semibold">
							login status: <span className="text-pink-300">no active</span>
						</p>
					</div>
					<div className="flex flex-col items-center gap-4">
						<Link href={'/signup'} className="w-full max-w-lg px-4 py-2 rounded-3xl bg-violet-600">
							<p>create user</p>
						</Link>
						<Link href={'/signin'} className="w-full max-w-lg px-4 py-2 rounded-3xl bg-violet-600">
							<p>login</p>
						</Link>
					</div>
				</section>
			</div>
		</header>
	);
}

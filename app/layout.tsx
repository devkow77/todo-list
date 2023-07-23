import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContextProvider } from './context/store';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'todo list',
	description: 'todo list description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<GlobalContextProvider>{children}</GlobalContextProvider>
				<ToastContainer />
			</body>
		</html>
	);
}

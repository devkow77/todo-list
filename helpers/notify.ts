import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions: ToastOptions<{}> = {
	position: 'bottom-center',
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'colored',
};

export const notifyError = (message: string) => toast.error(message, toastOptions);

export const notifySuccess = (message: string) => toast.success(message, toastOptions);

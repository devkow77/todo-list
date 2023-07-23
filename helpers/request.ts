import { notifySuccess, notifyError } from './notify';

interface userInterface {
	id?: string;
	username?: string;
	email: string;
	password: string;
}

// SIGNUP PAGE REQUEST //

export const createUser = async (user: userInterface) => {
	try {
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...user }),
		});
		const data = await response.json();
		if (!response.ok) {
			notifyError(data.message);
			return;
		}
		notifySuccess(data.message);
	} catch (error) {
		console.log(error);
	}
};

// SIGNIN PAGE REQUEST //

export const loginUser = async (user: userInterface) => {
	try {
		const response = await fetch('/api/auth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...user }),
		});
		const data = await response.json();
		if (!response.ok) {
			notifyError(data.message);
			return;
		}
		return data.token;
	} catch (error) {
		console.log(error);
	}
};

// TASKS PAGE REQUESTS //

export const loadTasks = async (token: any) => {
	try {
		if (!token) return false;
		const response = await fetch('/api/tasks', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const { findTasks, decoded } = await response.json();
		return {
			findTasks,
			decoded,
		};
	} catch (error) {
		console.log(error);
	}
};

export const createTask = async (token: any, task: any, user: any) => {
	try {
		const response = await fetch('/api/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ ...task, userId: user.id }),
		});
		const { findTasks, message } = await response.json();
		return {
			findTasks,
			message,
		};
	} catch (error) {
		console.log(error);
	}
};

export const deleteTask = async (token: any, id: string) => {
	try {
		const response = await fetch(`/api/tasks/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const { findTasks, message } = await response.json();
		if (!response.ok) {
			return message;
		}
		return {
			findTasks,
			message,
		};
	} catch (error) {
		console.log('there was an error: ', error);
	}
};

// TASKS/:ID PAGE REQUESTS //

export const loadSingleTask = async (id: any) => {
	try {
		const response = await fetch(`/api/tasks/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const { findTask } = await response.json();
		return {
			findTask,
		};
	} catch (error) {
		console.log(error);
	}
};

export const updateTask = async (id: any, task: any) => {
	try {
		const response = await fetch(`/api/tasks/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...task }),
		});
		const { message } = await response.json();
		return {
			message,
		};
	} catch (error) {
		console.log(error);
	}
};

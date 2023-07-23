'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react';

interface userInterface {
	id?: string;
	username: string;
	email: string;
	password: string;
}

const userInitialState: userInterface = {
	username: '',
	email: '',
	password: '',
};

interface taskInterface {
	name: string;
	complited: boolean;
	userId: string;
}

const taskInitialState: taskInterface = {
	name: '',
	complited: false,
	userId: '',
};

interface GlobalContextInterface {
	user: userInterface;
	setUser: Dispatch<SetStateAction<userInterface>>;
	task: taskInterface;
	setTask: Dispatch<SetStateAction<taskInterface>>;
}

const GlobalContext = createContext<GlobalContextInterface>({
	user: userInitialState,
	setUser: () => {},
	task: taskInitialState,
	setTask: () => {},
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<userInterface>(userInitialState);
	const [task, setTask] = useState<taskInterface>(taskInitialState);

	return <GlobalContext.Provider value={{ user, setUser, task, setTask }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = (): GlobalContextInterface => useContext(GlobalContext);

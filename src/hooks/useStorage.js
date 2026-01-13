import { useState, useEffect } from 'react';

const STORAGE_KEY = 'rsr_user';

export const useStorage = () => {
	const [user, setUserState] = useState(null);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setUserState(JSON.parse(raw));
		} catch (e) {
			// ignore
		}
	}, []);

	const saveUser = (u) => {
		setUserState(u);
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
			// Persist to server if available
			fetch('http://localhost:4000/api/saveUser', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(u),
			}).catch(() => {
				// ignore network errors during save
			});
		} catch (e) {}
	};

	const clearUser = () => {
		setUserState(null);
		try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
	};

	return { user, saveUser, clearUser };
};

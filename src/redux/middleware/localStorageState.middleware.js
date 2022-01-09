export const localStorageStateMiddleware = (store) => (next) => (action) => {
	const before = {
		expiresIn: store.getState().user.expiresIn,
		_id: store.getState().user._id,
	};
	next(action);
	const after = {
		expiresIn: store.getState().user.expiresIn,
		_id: store.getState().user._id,
	};
	Object.entries(before).forEach(([key, value]) =>
		after[key]
			? value !== after[key] && localStorage.setItem(key, after[key])
			: localStorage.removeItem(key)
	);
};

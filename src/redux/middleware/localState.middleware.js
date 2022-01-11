export function isUserAuthenticated() {
	return Boolean(
		localStorage.getItem('_id') &&
			localStorage.getItem('expiresIn') &&
			localStorage.getItem('user')
	);
}

export const localStateMiddleware = (storeAPI) => (next) => (action) => {
	let userState = storeAPI.getState().user;
	/**
	 * Khi người dùng logout, cần xóa state đã lưu trong localstorage
	 */
	if (action.type === 'user/logout/fulfilled') {
		localStorage.removeItem('_id');
		localStorage.removeItem('expiresIn');
		localStorage.removeItem('user');
		return next(action);
	} else {
		/**
		 * Cập nhật state trong localstorage
		 * khi state trước lúc thực hiện action khác state sau lúc đã thực hiện action
		 */
		const before = {
			_id: userState._id,
			user: JSON.stringify({
				name: userState.name,
				email: userState.email,
				phone: userState.phone,
				about: userState.about,
				avatar: userState.avatar,
				role: userState.role,
			}),
			expiresIn: userState.expiresIn,
		};
		next(action);
		userState = storeAPI.getState().user;
		const after = {
			_id: userState._id,
			user: JSON.stringify({
				name: userState.name,
				email: userState.email,
				phone: userState.phone,
				about: userState.about,
				avatar: userState.avatar,
				role: userState.role,
			}),
			expiresIn: userState.expiresIn,
		};
		Object.entries(before).forEach(([key, value]) => {
			value !== after[key] && localStorage.setItem(key, after[key]);
		});
	}
};

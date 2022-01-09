import { userActions } from '../../features/user/user.slice';

export const refreshTokenMiddleware = (storeAPI) => (next) => (action) => {
	const expiresIn = localStorage.getItem('expiresIn') || 0;
	const _id = localStorage.getItem('_id');
	if (
		action.meta &&
		//We cant refresh when user not login
		expiresIn > 0 &&
		expiresIn < Date.now() &&
		_id
	) {
		if (
			!['user/refresh', 'user/logout', 'user/register'].find((v) =>
				action.type.startsWith(v)
			)
		)
			storeAPI.dispatch(userActions.refresh({ _id }));
		else if (action.type.endsWith('refresh/rejected'))
			storeAPI.dispatch(userActions.logout());
	}
	next(action);
};

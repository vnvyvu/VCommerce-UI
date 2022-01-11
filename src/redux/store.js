import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/user/user.slice';
import { usersReducer } from '../features/users/users.slice';
import { loginReducer } from '../pages/login/login.slice';
import { registerReducer } from '../pages/register/register.slice';
import { localStateMiddleware } from './middleware/localState.middleware';

export default configureStore({
	reducer: {
		register: registerReducer,
		login: loginReducer,
		user: userReducer,
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([localStateMiddleware]),
});

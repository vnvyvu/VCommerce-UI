import { axiosClient } from './axiosClient';

export const authService = {
	login(data) {
		return axiosClient.post('auth/login', data);
	},
	register(data) {
		return axiosClient.post('auth/register', data);
	},
	logout() {
		return axiosClient.get('auth/logout');
	},
	refresh(data) {
		return axiosClient.post('auth/token', data);
	},
};

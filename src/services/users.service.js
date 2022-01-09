import { axiosClient } from './axiosClient';

export const usersService = {
	get(data) {
		return axiosClient.get('users?search=' + data);
	},
};

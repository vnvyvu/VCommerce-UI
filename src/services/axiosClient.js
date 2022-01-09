import axios from 'axios';

const client = axios.create({
	baseURL: 'http://localhost:8008/',
	responseType: 'json',
	withCredentials: true,
});

export const axiosClient = client;
export const axiosThunk = async (payload, ThunkAPI, axiosServiceMethod) => {
	try {
		return (await axiosServiceMethod(payload)).data;
	} catch (err) {
		return ThunkAPI.rejectWithValue(err.response.data.errors);
	}
};

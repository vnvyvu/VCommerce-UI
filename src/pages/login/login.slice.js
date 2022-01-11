import { createSlice } from '@reduxjs/toolkit';
import { defaultReducers } from '../../redux/defaultReducers';

const initialState = {
	email: {
		value: '',
		helperText: '',
	},
	password: {
		value: '',
		helperText: '',
	},
	remember: {
		value: false,
	},
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		...defaultReducers(initialState),
	},
});

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

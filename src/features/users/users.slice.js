import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosThunk } from '../../services/axiosClient';
import { usersService } from '../../services/users.service';

const get = createAsyncThunk(
	'users/get',
	async (payload, ThunkAPI) =>
		await axiosThunk(payload, ThunkAPI, usersService.get)
);

const slice = createSlice({
	name: 'users',
	initialState: {
		data: [],
	},
	extraReducers: {
		[get.pending]: (state, action) => {
			state.getStatus = 'pending';
		},
		[get.fulfilled]: (state, action) => {
			state.getStatus = 'successful';
			state.data = action.payload;
		},
		[get.rejected]: (state, action) => {
			state.getStatus = 'failed';
		},
	},
});

slice.actions.get = get;

export const usersSlice = slice;
export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

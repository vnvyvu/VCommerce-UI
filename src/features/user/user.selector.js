import { createSelector } from '@reduxjs/toolkit';

export const userSelector = (state) => state.user;

export const expiresInSelector = createSelector(
	userSelector,
	(user) => user.expiresIn
);

export const loginStatusSelector = createSelector(
	userSelector,
	({ loginStatus, errorMsg }) => ({ loginStatus, errorMsg })
);

export const registerStatusSelector = createSelector(
	userSelector,
	({ registerStatus, errorMsg }) => ({ registerStatus, errorMsg })
);

export const idSelector = createSelector(userSelector, ({ _id }) => _id);

import { createSelector } from '@reduxjs/toolkit';

export const loginSelector = (state) => state.login;

export const loginRememberSelector = createSelector(
	loginSelector,
	(login) => login.remember
);
export const loginEmailSelector = createSelector(
	loginSelector,
	(login) => login.email
);
export const loginPasswordSelector = createSelector(
	loginSelector,
	(login) => login.password
);

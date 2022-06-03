import { RootState } from "../store";

export const loginSelector = (state: RootState) => state.login;

export const isLoggedInSelector = (state: RootState) => state.login.isLoggedIn;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoginState = {
    isLoggedIn: boolean;
    error: string | null;
    loading: boolean;
};

const initialState: LoginState = {
    isLoggedIn: false,
    error: null,
    loading: false,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setError(state, action: PayloadAction<LoginState["error"]>) {
            return {
                ...initialState,
                error: action.payload,
            };
        },
        setLoading() {
            return {
                ...initialState,
                loading: true,
            };
        },
        setLoggedIn() {
            return {
                ...initialState,
                isLoggedIn: true,
            };
        },
        setLoggedOut() {
            return initialState;
        },
    },
});

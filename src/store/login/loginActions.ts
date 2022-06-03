import { loginRequest } from "../../api/login";
import { validateUserForm } from "../../utils/validate";
import { loadHistoryAction, resetHistory } from "../history/historyActions";
import { loadQuotesAction, resetQuotes } from "../quotes/quotesActions";
import { AppDispatch } from "../store";
import { loginSlice } from "./loginSlice";

export const { setError, setLoading, setLoggedIn, setLoggedOut } =
    loginSlice.actions;

export const loginAction =
    (login: string, password: string) => async (dispatch: AppDispatch) => {
        const validationError = validateUserForm(login, password);
        if (validationError !== null) {
            dispatch(setError(validationError));
        } else {
            dispatch(setLoading());
            const response = await loginRequest(login, password);
            if (response.result === "ok") {
                dispatch(setLoggedIn());
                dispatch(loadQuotesAction());
                dispatch(loadHistoryAction());
            } else {
                dispatch(setError(response.error));
            }
        }
    };

export const logoutAction = () => (dispatch: AppDispatch) => {
    dispatch(resetQuotes());
    dispatch(resetHistory());
    dispatch(setLoggedOut());
};

import { quotesRequest } from "../../api/quotes";
import { AppDispatch, RootState } from "../store";
import { quotesSlice } from "./quotesSlice";

export const { resetQuotes, setLoading, setError, setQuotes, toggleQuote } =
    quotesSlice.actions;

export const loadQuotesAction =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setLoading());
        const response = await quotesRequest();
        if (response.result === "ok") {
            dispatch(setQuotes(response.assets));
        } else {
            dispatch(setError(response.error));
        }
    };

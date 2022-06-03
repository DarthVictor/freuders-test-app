import { historyRequest } from "../../api/history";
import { AppDispatch, RootState } from "../store";
import { historySlice } from "./historySlice";

export const {
    resetHistory,
    setLoading,
    setError,
    setHistory,
    prevPage,
    nextPage,
} = historySlice.actions;

export const loadHistoryAction =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setLoading());
        const response = await historyRequest();
        if (response.result === "ok") {
            dispatch(setHistory(response.deals));
        } else {
            dispatch(setError(response.error));
        }
    };

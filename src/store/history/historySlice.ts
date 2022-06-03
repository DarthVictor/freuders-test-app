import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Deal } from "../../api/history";
import { getGoodHistory } from "../../utils/goodHistory";
import { LoadingState } from "../types";

type HistoryState = {
    state: LoadingState;
    error: string | null;
    pages: Deal[][];
    allDeals: Deal[];
    currentPage: number;
};

const initialState: HistoryState = {
    state: LoadingState.NOT_INITED,
    error: null,
    pages: [],
    allDeals: [],
    currentPage: 0,
};

export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        resetHistory() {
            return initialState;
        },

        setLoading() {
            return {
                ...initialState,
                state: LoadingState.LOADING,
            };
        },

        setError(state, action: PayloadAction<string>) {
            return {
                ...initialState,
                state: LoadingState.ERROR,
                error: action.payload,
            };
        },

        setHistory(state, action: PayloadAction<Deal[]>) {
            const allDeals = action.payload;
            const pages = getGoodHistory(allDeals);

            return {
                ...initialState,
                state: LoadingState.SUCCESS,
                pages,
                allDeals,
            };
        },

        prevPage(state) {
            if (state.currentPage > 0) {
                state.currentPage -= 1;
            }
        },

        nextPage(state) {
            if (state.currentPage < state.pages.length - 1) {
                state.currentPage += 1;
            }
        },
    },
});

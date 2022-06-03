import { createSelector, current } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const currentPageHistorySelector = (state: RootState) =>
    state.history.pages[state.history.currentPage];

export const historyStateSelector = (state: RootState) => state.history.state;
export const historyErrorSelector = (state: RootState) => state.history.error;

export const historyPaginationSelector = createSelector(
    (state: RootState) => state.history.pages,
    (state: RootState) => state.history.currentPage,
    (pages, currentPage) => ({
        total: pages.length,
        currentPage,
        hasPrev: currentPage > 0,
        hasNext: currentPage < pages.length - 1,
    })
);

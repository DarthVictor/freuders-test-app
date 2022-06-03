import { fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { History } from "../History/History";

import {
    setError,
    setHistory,
    setLoading,
} from "../../store/history/historyActions";
import { historySlice } from "../../store/history/historySlice";
import { renderWithStore } from "../../utils/testUtils";
import { HISTORY_MOCK } from "../../__mocks__/api.mocks";

describe("History", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("renders response with correct number of pages", async () => {
        const history = historySlice.reducer(
            undefined,
            setHistory(HISTORY_MOCK.deals)
        );

        const {
            store,
            result: { getByTestId },
        } = renderWithStore(<History />, { history });

        expect(getByTestId("page_counter").textContent?.trim()).toBe("1 / 9");

        fireEvent.click(getByTestId("prev_page"));
        fireEvent.click(getByTestId("next_page"));

        await waitFor(() =>
            expect(store.getActions().map(({ type }) => type)).toEqual([
                "history/nextPage",
            ])
        );
    });

    it("renders preloader", async () => {
        const history = historySlice.reducer(undefined, setLoading());
        const {
            result: { getByTestId },
        } = renderWithStore(<History />, { history });

        expect(getByTestId("Spinner")).toBeTruthy();
    });

    it("renders error with refresh button", async () => {
        const history = historySlice.reducer(undefined, setError("404"));
        const {
            store,
            result: { getByTestId },
        } = renderWithStore(<History />, { history });

        expect(getByTestId("refresh")).toBeTruthy();

        fireEvent.click(getByTestId("refresh"));

        await waitFor(() =>
            expect(store.getActions().map(({ type }) => type)).toEqual([
                "history/setLoading",
            ])
        );
    });
});

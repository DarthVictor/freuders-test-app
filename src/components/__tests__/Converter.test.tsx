import userEvent from "@testing-library/user-event";
import { fireEvent, waitFor } from "@testing-library/react";

import fetchMock from "jest-fetch-mock";
import {
    setLoading,
    setQuotes,
    setError,
} from "../../store/quotes/quotesActions";
import { quotesSlice } from "../../store/quotes/quotesSlice";
import { renderWithStore } from "../../utils/testUtils";
import { QUOTES_MOCK } from "../../__mocks__/api.mocks";
import { Converter } from "../Converter/Converter";

describe("QuotesTable", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("renders correct response and adds to favourites", async () => {
        const quotes = quotesSlice.reducer(
            undefined,
            setQuotes(QUOTES_MOCK.assets)
        );
        const {
            store,
            result: { getByTestId, queryByTestId },
        } = renderWithStore(<Converter />, { quotes });

        fireEvent.change(getByTestId("quantity"), {
            target: { value: "111" },
        });
        userEvent.selectOptions(getByTestId("cur1"), "BTC");

        await waitFor(() =>
            expect(getByTestId("cur2").children.length).toBe(3)
        );

        userEvent.selectOptions(getByTestId("cur2"), "EUR");

        fireEvent.click(getByTestId("calculate"));

        await waitFor(() => expect(queryByTestId("result_value")).toBeTruthy());

        expect(getByTestId("result_value").innerHTML.trim()).toBe("1069921.23");
    });

    it("renders preloader", async () => {
        const quotes = quotesSlice.reducer(undefined, setLoading());
        const {
            result: { getByTestId },
        } = renderWithStore(<Converter />, { quotes });

        expect(getByTestId("Spinner")).toBeTruthy();
    });

    it("renders error with refresh button", async () => {
        const quotes = quotesSlice.reducer(undefined, setError("404"));
        const {
            store,
            result: { getByTestId },
        } = renderWithStore(<Converter />, { quotes });

        expect(getByTestId("refresh")).toBeTruthy();

        fireEvent.click(getByTestId("refresh"));

        await waitFor(() =>
            expect(store.getActions().map(({ type }) => type)).toEqual([
                "quotes/setLoading",
            ])
        );
    });
});

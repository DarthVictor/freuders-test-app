import { fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import {
    setLoading,
    setQuotes,
    setError,
    toggleQuote,
} from "../../store/quotes/quotesActions";
import { quotesSlice } from "../../store/quotes/quotesSlice";
import { renderWithStore } from "../../utils/testUtils";
import { QUOTES_MOCK } from "../../__mocks__/api.mocks";
import { QuotesTable } from "../QuotesTable/QuotesTable";

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
            result: { getAllByTestId, getByTestId },
        } = renderWithStore(<QuotesTable />, { quotes });

        expect(getAllByTestId("QuoteRow").length).toBe(
            QUOTES_MOCK.assets.length
        );

        fireEvent.click(getByTestId("add_XAG/USD_to_favourites"));

        await waitFor(() =>
            expect(store.getActions()).toEqual([
                {
                    type: "quotes/toggleQuote",
                    payload: "XAG/USD",
                },
            ])
        );
    });

    it("renders correct response and adds to favourites", async () => {
        const quotes = quotesSlice.reducer(
            undefined,
            setQuotes(QUOTES_MOCK.assets)
        );

        const quotesWithFavourite = quotesSlice.reducer(
            quotes,
            toggleQuote("XAG/USD")
        );

        const {
            result: { getAllByTestId },
        } = renderWithStore(<QuotesTable />, {
            quotes: quotesWithFavourite,
        });

        expect(
            getAllByTestId("QuoteRow")[0].children[1].textContent?.trim()
        ).toBe("XAG/USD");
    });

    it("renders preloader", async () => {
        const quotes = quotesSlice.reducer(undefined, setLoading());
        const {
            result: { getByTestId },
        } = renderWithStore(<QuotesTable />, { quotes });

        expect(getByTestId("Spinner")).toBeTruthy();
    });

    it("renders error with refresh button", async () => {
        const quotes = quotesSlice.reducer(undefined, setError("404"));
        const {
            store,
            result: { getByTestId },
        } = renderWithStore(<QuotesTable />, { quotes });

        expect(getByTestId("refresh")).toBeTruthy();

        fireEvent.click(getByTestId("refresh"));

        await waitFor(() =>
            expect(store.getActions().map(({ type }) => type)).toEqual([
                "quotes/setLoading",
            ])
        );
    });
});

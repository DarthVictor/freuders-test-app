import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Asset } from "../../api/quotes";
import { LoadingState } from "../types";

type QuotesState = {
    state: LoadingState;
    error: string | null;
    allQuotes: string[];
    favouritesQuotes: string[];
    otherQuotes: string[];
    quotes: Record<string, Asset>;
    rates: Record<string, Record<string, number>>;
};

const initialState: QuotesState = {
    state: LoadingState.NOT_INITED,
    error: null,
    allQuotes: [],
    favouritesQuotes: [],
    otherQuotes: [],
    quotes: {},
    rates: {},
};

export const quotesSlice = createSlice({
    name: "quotes",
    initialState,
    reducers: {
        resetQuotes() {
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

        setQuotes(state, action: PayloadAction<Asset[]>) {
            const quotes: QuotesState["quotes"] = {};
            const allQuotes: QuotesState["allQuotes"] = [];
            const rates: QuotesState["rates"] = {};
            for (const quote of action.payload) {
                quotes[quote.asset] = quote;
                allQuotes.push(quote.asset);
                const [cur1, cur2] = quote.asset.split("/");
                rates[cur1] = rates[cur1] ?? {};
                rates[cur2] = rates[cur2] ?? {};
                rates[cur1][cur2] = quote.quote;
                rates[cur2][cur1] = 1 / quote.quote;
            }

            return {
                ...initialState,
                state: LoadingState.SUCCESS,
                quotes,
                allQuotes,
                otherQuotes: allQuotes,
                rates,
            };
        },

        toggleQuote(state, action: PayloadAction<string>) {
            const quote = action.payload;
            if (state.favouritesQuotes.includes(quote)) {
                state.favouritesQuotes = state.favouritesQuotes.filter(
                    (favorQuote) => favorQuote !== quote
                );
            } else {
                state.favouritesQuotes = [quote, ...state.favouritesQuotes];
            }
            const favourites = new Set(state.favouritesQuotes);
            const otherQuotes = state.allQuotes.filter(
                (quote) => !favourites.has(quote)
            );
            state.otherQuotes = otherQuotes;
        },
    },
});

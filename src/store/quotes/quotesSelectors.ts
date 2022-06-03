import { RootState } from "../store";

export const quotesSelector = (state: RootState) => state.quotes;
export const makeQuoteSelector = (quote: string) => (state: RootState) =>
    state.quotes.quotes[quote];

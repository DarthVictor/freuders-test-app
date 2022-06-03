import { configureStore } from "@reduxjs/toolkit";
import { historySlice } from "./history/historySlice";
import { loginSlice } from "./login/loginSlice";
import { quotesSlice } from "./quotes/quotesSlice";
import { tabsSlice } from "./tabs/tabsSlice";

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        tabs: tabsSlice.reducer,
        quotes: quotesSlice.reducer,
        history: historySlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TabId } from "../types";

const TABS_LIST = [
    {
        id: TabId.QUOTES,
        name: "Курсы валют",
    },
    {
        id: TabId.CONVERTER,
        name: "Конвертор",
    },
    {
        id: TabId.HISTORY,
        name: "История",
    },
];

type TabsState = {
    tabs: typeof TABS_LIST;
    tab: TabId;
};

export const initialState: TabsState = {
    tab: TABS_LIST[0].id,
    tabs: TABS_LIST,
};

export const tabsSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setTab(state, action: PayloadAction<TabsState["tab"]>) {
            state.tab = action.payload;
        },
    },
});

export const { setTab } = tabsSlice.actions;

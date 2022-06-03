import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState as initialHistoryState } from "../store/history/historySlice";
import { initialState as initialLoginState } from "../store/login/loginSlice";
import { initialState as initialQuotesState } from "../store/quotes/quotesSlice";
import { initialState as initialTabState } from "../store/tabs/tabsSlice";

export const mockStore = createMockStore([thunk]);

export const MOCK_INITIAL_STATE = {
    login: initialLoginState,
    tabs: initialTabState,
    quotes: initialQuotesState,
    history: initialHistoryState,
};

export const renderWithStore = (
    component: ReactNode,
    initialState: Partial<typeof MOCK_INITIAL_STATE> = {}
) => {
    const store = mockStore({ ...MOCK_INITIAL_STATE, ...initialState });
    return {
        result: render(<Provider store={store}>{component}</Provider>),
        store,
    };
};

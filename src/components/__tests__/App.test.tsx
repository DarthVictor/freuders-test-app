import { fireEvent, waitFor } from "@testing-library/react";

import App from "../../App";

import { quotesSlice } from "../../store/quotes/quotesSlice";
import { setQuotes } from "../../store/quotes/quotesActions";
import { loginSlice } from "../../store/login/loginSlice";
import { setLoggedIn } from "../../store/login/loginActions";
import { historySlice } from "../../store/history/historySlice";
import { setHistory } from "../../store/history/historyActions";

import { MOCK_INITIAL_STATE, renderWithStore } from "../../utils/testUtils";
import { HISTORY_MOCK, QUOTES_MOCK } from "../../__mocks__/api.mocks";
import { TabId } from "../../store/types";

describe("App", () => {
    it("renders login form without auth", async () => {
        const {
            result: { getByTestId },
        } = renderWithStore(<App />);

        expect(getByTestId("login_input")).toBeTruthy();
    });

    const initState = {
        ...MOCK_INITIAL_STATE,
        login: loginSlice.reducer(undefined, setLoggedIn()),
        quotes: quotesSlice.reducer(undefined, setQuotes(QUOTES_MOCK.assets)),
        history: historySlice.reducer(
            undefined,
            setHistory(HISTORY_MOCK.deals)
        ),
    };

    it("renders quotes tab and changes tab", async () => {
        const {
            store,
            result: { getByTestId },
        } = renderWithStore(<App />, initState);

        expect(getByTestId("QuotesTable")).toBeTruthy();
        fireEvent.click(getByTestId(`Tab_${TabId.CONVERTER}`));

        await waitFor(() =>
            expect(store.getActions()).toEqual([
                {
                    type: "tab/setTab",
                    payload: TabId.CONVERTER,
                },
            ])
        );
    });

    it("renders converter tab", async () => {
        const {
            result: { getByTestId },
        } = renderWithStore(<App />, {
            ...initState,
            tabs: { ...MOCK_INITIAL_STATE.tabs, tab: TabId.CONVERTER },
        });

        expect(getByTestId("ConverterForm")).toBeTruthy();
    });

    it("renders history tab", async () => {
        const {
            result: { getByTestId },
        } = renderWithStore(<App />, {
            ...initState,
            tabs: { ...MOCK_INITIAL_STATE.tabs, tab: TabId.HISTORY },
        });

        expect(getByTestId("HistoryTable")).toBeTruthy();
    });
});

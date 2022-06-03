import { fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { LoginPage } from "../LoginPage/LoginPage";
import { renderWithStore } from "../../utils/testUtils";
import { mockedServerResponse } from "../../__mocks__/api.mocks";

describe("LoginPage", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("logins with correct password and loads data", async () => {
        const {
            store,
            result: { getByTestId },
        } = renderWithStore(<LoginPage />);

        fetchMock.mockResponse(mockedServerResponse);

        expect(getByTestId("submit_button").getAttribute("disabled")).toBe("");

        fireEvent.change(getByTestId("login_input"), {
            target: { value: "login@mail.com" },
        });

        fireEvent.change(getByTestId("password_input"), {
            target: { value: "CORRECT_pass12" },
        });

        await expect(
            getByTestId("submit_button").getAttribute("disabled")
        ).toBeNull();

        fireEvent.click(getByTestId("submit_button"));

        await waitFor(() =>
            expect(store.getActions().map(({ type }) => type)).toEqual([
                "login/setLoading",
                "login/setLoggedIn",
                "quotes/setLoading",
                "history/setLoading",
                "quotes/setQuotes",
                "history/setHistory",
            ])
        );

        expect(fetchMock).toBeCalledTimes(3);
    });

    it("show erorr with wrong password", async () => {
        const {
            store,
            result: { getByTestId },
        } = renderWithStore(<LoginPage />);

        fetchMock.mockResponse(mockedServerResponse);

        expect(getByTestId("submit_button").getAttribute("disabled")).toBe("");

        fireEvent.change(getByTestId("login_input"), {
            target: { value: "login@mail.com" },
        });

        fireEvent.change(getByTestId("password_input"), {
            target: { value: "WRONG_pass12" },
        });

        await expect(
            getByTestId("submit_button").getAttribute("disabled")
        ).toBeNull();

        fireEvent.click(getByTestId("submit_button"));

        await waitFor(() =>
            expect(store.getActions()).toEqual([
                {
                    payload: undefined,
                    type: "login/setLoading",
                },
                {
                    payload: "404",
                    type: "login/setError",
                },
            ])
        );
        expect(fetchMock).toBeCalledTimes(1);
    });

    it("does not make request on failed password validation", async () => {
        const {
            store,
            result: { getByTestId },
        } = renderWithStore(<LoginPage />);

        fetchMock.mockResponse(mockedServerResponse);

        expect(getByTestId("submit_button").getAttribute("disabled")).toBe("");

        fireEvent.change(getByTestId("login_input"), {
            target: { value: "login@mail.com" },
        });

        fireEvent.change(getByTestId("password_input"), {
            target: { value: "WRONG_pass" },
        });

        await expect(
            getByTestId("submit_button").getAttribute("disabled")
        ).toBeNull();

        fireEvent.click(getByTestId("submit_button"));

        await waitFor(() =>
            expect(store.getActions()).toEqual([
                {
                    payload: `Пароль должен быть не короче 7 символов и содержать только латинские буквы, цифры и "_".`,
                    type: "login/setError",
                },
            ])
        );

        expect(fetchMock).toBeCalledTimes(0);
    });
});

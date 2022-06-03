import { API_URL } from "./constants";

type LoginResponse =
    | {
          result: "ok";
      }
    | {
          result: "error";
          error: string;
      };

export const loginRequest = async (
    login: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "login",
                login,
                password,
            }),
        });
        return res.json();
    } catch {
        return {
            result: "error",
            error: "Network error",
        };
    }
};

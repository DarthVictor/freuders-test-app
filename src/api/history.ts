import { API_URL } from "./constants";

type ServerDeal = {
    /** валютная пара. Элементы разделены знаком '/' */
    asset: string;
    /** дата начала сделки в формате YYYY-MM-DD HH:mm:ss */
    startDate: string;
    /** котировка на начало сделки */
    startQuote: string;
    /** дата конца сделки в формате  YYYY-MM-DD HH:mm:ss */
    finishDate: string;
    /** котировка на конец сделки */
    finishQuote: string;
    /** прибыль или убыток от сделки */
    profit: string;
};

export type Deal = {
    /** валютная пара. Элементы разделены знаком '/' */
    asset: string;
    /** дата начала сделки */
    startDate: number;
    /** котировка на начало сделки */
    startQuote: number;
    /** дата конца сделки */
    finishDate: number;
    /** котировка на конец сделки */
    finishQuote: number;
    /** прибыль или убыток от сделки */
    profit: number;
};

export const mapDeal = ({
    asset,
    startDate,
    startQuote,
    finishDate,
    finishQuote,
    profit,
}: ServerDeal) => ({
    asset,
    startDate: new Date(startDate).getTime(),
    startQuote: Number(startQuote),
    finishDate: new Date(finishDate).getTime(),
    finishQuote: Number(finishQuote),
    profit: Number(profit),
});

type HistoryServerResponse =
    | {
          result: "ok";
          deals: ServerDeal[];
      }
    | {
          result: "error";
          error: string;
      };

type HistorysResponse =
    | {
          result: "ok";
          deals: Deal[];
      }
    | {
          result: "error";
          error: string;
      };

export const historyRequest = async (): Promise<HistorysResponse> => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({ action: "history" }),
        });

        const response: HistoryServerResponse = await res.json();
        if (response.result === "ok") {
            return {
                result: "ok",
                deals: response.deals.map(mapDeal),
            };
        }
        return response;
    } catch {
        return {
            result: "error",
            error: "Network error",
        };
    }
};

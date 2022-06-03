import { API_URL } from "./constants";

type ServerAsset = {
    /** валютная пара. Элементы разделены знаком '/' */
    asset: string;
    /** дата котировки в формате YYYY-MM-DD */
    startDate: string;
    /**  котировка валютной пары */
    quote: string;
};

export type Asset = {
    /** валютная пара. Элементы разделены знаком '/' */
    asset: string;
    /** дата котировки */
    startDate: number;
    /**  котировка валютной пары */
    quote: number;
};

const mapAsset = ({ asset, startDate, quote }: ServerAsset) => ({
    asset,
    quote: Number(quote),
    startDate: new Date(startDate).getTime(),
});

type QuotesServerResponse =
    | {
          result: "ok";
          assets: ServerAsset[];
      }
    | {
          result: "error";
          error: string;
      };

export type QuotesResponse =
    | {
          result: "ok";
          assets: Asset[];
      }
    | {
          result: "error";
          error: string;
      };

export const quotesRequest = async (): Promise<QuotesResponse> => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({ action: "quote" }),
        });
        const response: QuotesServerResponse = await res.json();
        if (response.result === "ok") {
            return {
                result: "ok",
                assets: response.assets.map(mapAsset),
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

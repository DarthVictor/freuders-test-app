import { Deal } from "../api/history";

/*
На вход попадает 100 сделок. Отобразить столько страниц, сколько получится из того набора данных,
которые попадают на вход согласно приведённым ниже критериям и по 10 сделок истории на странице.
В каждой десятке должно быть:
- не больше 2-х убыточных сделок;
- сделки отсортированы по дате и времени закрытия в контексте всей истории 
 (вверху ближайшая сделка к текущей даты и времени, и так далее)
- хотя бы 1-2 сделки с прибыльностью больше 100 долларов
- не более двух одинаковых активов
*/

const DEALS_PER_PAGE = 10;
const MAX_NEGATIVE = 2;
const MAX_WITH_SAME_ASSET = 2;
const HIGH_PROFIT = 100;

export const getGoodHistory = (deals: Deal[]) => {
    const sortedDeals = [...deals].sort((a, b) => b.finishDate - a.finishDate);
    const pages: Deal[][] = [];
    let hasHighProfitDeals = false;
    let numberOfDealsByAsset: Record<string, number> = {};
    let numOfNegativeDeals = 0;
    for (const deal of sortedDeals) {
        if (
            pages.length === 0 ||
            pages[pages.length - 1].length === DEALS_PER_PAGE
        ) {
            // start new page
            pages.push([]);
            hasHighProfitDeals = false;
            numberOfDealsByAsset = {};
            numOfNegativeDeals = 0;
        }
        const lastPage = pages[pages.length - 1];
        const isNegative = deal.profit < 0;
        const numWithSameAsset = numberOfDealsByAsset[deal.asset] ?? 0;
        const hasHighProfit = deal.profit > HIGH_PROFIT;
        if (
            (!isNegative || numOfNegativeDeals < MAX_NEGATIVE) &&
            (hasHighProfit || lastPage.length < DEALS_PER_PAGE - 1) &&
            numWithSameAsset < MAX_WITH_SAME_ASSET
        ) {
            lastPage.push(deal);
            hasHighProfitDeals = hasHighProfitDeals || hasHighProfit;
            numberOfDealsByAsset[deal.asset] = numWithSameAsset + 1;
            numOfNegativeDeals += isNegative ? 1 : 0;
        }
    }
    return pages;
};

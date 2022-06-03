import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { ErrorResult } from "../ErrorResult/ErrorResult";
import { QuoteRow } from "./QuoteRow";
import { Table, TBody, Th, Thead, TRow } from "../Table/Table";
import { Spinner } from "../Spinner/Spinner";

import { quotesSelector } from "../../store/quotes/quotesSelectors";
import { LoadingState } from "../../store/types";
import { loadQuotesAction } from "../../store/quotes/quotesActions";
import { AppDispatch } from "../../store/store";

import styles from "./QuotesTable.module.css";

export const QuotesTable: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
    className,
    ...other
}) => {
    const { favouritesQuotes, otherQuotes, state, error } =
        useSelector(quotesSelector);
    const dispatch = useDispatch<AppDispatch>();

    if ([LoadingState.NOT_INITED, LoadingState.LOADING].includes(state)) {
        return <Spinner className={styles.table} />;
    }

    if (state === LoadingState.ERROR) {
        return (
            <ErrorResult
                className={styles.table}
                error={error}
                onRefresh={() => dispatch(loadQuotesAction())}
            />
        );
    }

    return (
        <Table className={classNames(className, styles.table)} {...other}>
            <Thead>
                <TRow>
                    <Th />
                    <Th>Валютная пара</Th>
                    <Th>Котировка </Th>
                    <Th>Дата получения</Th>
                </TRow>
            </Thead>
            <TBody>
                {favouritesQuotes.map((quote) => (
                    <QuoteRow key={quote} favourite asset={quote} />
                ))}
                {otherQuotes.map((quote) => (
                    <QuoteRow key={quote} asset={quote} />
                ))}
            </TBody>
        </Table>
    );
};

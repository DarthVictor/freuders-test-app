import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { format } from "date-fns";

import { Button } from "../Button/Button";
import { ErrorResult } from "../ErrorResult/ErrorResult";
import { ArrowLeft } from "../Icons/ArrowLeft/ArrowLeft";
import { ArrowRight } from "../Icons/ArrowRight/ArrowRight";
import { Spinner } from "../Spinner/Spinner";
import { Table, Thead, TRow, TBody, Th, Td } from "../Table/Table";

import {
    currentPageHistorySelector,
    historyErrorSelector,
    historyPaginationSelector,
    historyStateSelector,
} from "../../store/history/historySelectors";
import {
    loadHistoryAction,
    nextPage,
    prevPage,
} from "../../store/history/historyActions";
import { LoadingState } from "../../store/types";
import { AppDispatch } from "../../store/store";

import styles from "./History.module.css";

export const History: React.FC = () => {
    const state = useSelector(historyStateSelector);
    const error = useSelector(historyErrorSelector);
    const dispatch = useDispatch<AppDispatch>();

    if ([LoadingState.NOT_INITED, LoadingState.LOADING].includes(state)) {
        return <Spinner className={styles.table} />;
    }

    if (state === LoadingState.ERROR) {
        return (
            <ErrorResult
                className={styles.table}
                error={error}
                onRefresh={() => dispatch(loadHistoryAction())}
            />
        );
    }

    return (
        <>
            <HistoryTable />
            <HistoryPager />
        </>
    );
};

const HistoryTable: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
    className,
    ...other
}) => {
    const page = useSelector(currentPageHistorySelector);
    return (
        <Table className={classNames(className, styles.table)} {...other}>
            <Thead>
                <TRow>
                    <Th>Актив</Th>
                    <Th>Начало</Th>
                    <Th>Котировка</Th>
                    <Th>Конец</Th>
                    <Th>Котировка</Th>
                    <Th>Прибыль</Th>
                </TRow>
            </Thead>
            <TBody>
                {page.map((deal) => (
                    <TRow key={deal.asset + "__" + deal.finishDate}>
                        <Td>{deal.asset} </Td>
                        <Td>
                            {format(
                                new Date(deal.startDate),
                                "hh:mm dd.MM.yyyy"
                            )}
                        </Td>
                        <Td>{deal.startQuote}</Td>
                        <Td>
                            {format(
                                new Date(deal.finishDate),
                                "hh:mm dd.MM.yyyy"
                            )}
                        </Td>
                        <Td>{deal.finishQuote}</Td>
                        <Td>
                            {deal.profit > 0 && "+"}
                            {deal.profit}
                        </Td>
                    </TRow>
                ))}
            </TBody>
        </Table>
    );
};

const HistoryPager: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
    className,
    ...other
}) => {
    const { currentPage, total, hasNext, hasPrev } = useSelector(
        historyPaginationSelector
    );
    const dispatch = useDispatch();

    if (total === 0) return null;

    return (
        <div className={classNames(className, styles.pager)} {...other}>
            <Button
                className={styles.button}
                appearence="ghost"
                disabled={!hasPrev}
                onClick={() => dispatch(prevPage())}
            >
                <ArrowLeft />
            </Button>
            <span className={styles.counter}>
                {currentPage + 1} / {total}
            </span>
            <Button
                className={styles.button}
                appearence="ghost"
                disabled={!hasNext}
                onClick={() => dispatch(nextPage())}
            >
                <ArrowRight />
            </Button>
        </div>
    );
};

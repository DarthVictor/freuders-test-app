import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";
import { Spinner } from "../Spinner/Spinner";
import { ErrorResult } from "../ErrorResult/ErrorResult";

import { loadQuotesAction } from "../../store/quotes/quotesActions";
import { quotesSelector } from "../../store/quotes/quotesSelectors";
import { AppDispatch } from "../../store/store";
import { LoadingState } from "../../store/types";

import styles from "./Converter.module.css";

export const Converter: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
    props
) => {
    const { rates, state, error } = useSelector(quotesSelector);
    const dispatch = useDispatch<AppDispatch>();

    if ([LoadingState.NOT_INITED, LoadingState.LOADING].includes(state)) {
        return <Spinner />;
    }

    if (state === LoadingState.ERROR) {
        return (
            <ErrorResult
                error={error}
                onRefresh={() => dispatch(loadQuotesAction())}
            />
        );
    }

    if (Object.keys(rates).length === 0) {
        return (
            <ErrorResult
                error="Не удалось получить ни одного курса"
                onRefresh={() => dispatch(loadQuotesAction())}
            />
        );
    }

    return <ConverterForm {...props} />;
};

export const ConverterForm: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...other
}) => {
    const { rates } = useSelector(quotesSelector);

    const [quantity, setQuantity] = useState(0);
    const cur1List = useMemo(() => Object.keys(rates).sort(), [rates]);
    const [cur1, setCur1] = useState<string>(cur1List[0]);
    const cur2List = useMemo(
        () => Object.keys(rates[cur1]).sort(),
        [rates, cur1]
    );
    const [cur2, setCur2] = useState<string>(cur2List[0]);
    const [result, setResult] = useState<number | null>(null);

    return (
        <div
            className={classNames(className, styles.converter)}
            data-testid="ConverterForm"
            {...other}
        >
            <div className={styles.body}>
                <div className={styles.form}>
                    <div className={styles.label}>Сумма</div>

                    <div className={styles.inputRow}>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={({ target }) => {
                                setResult(null);
                                setQuantity(Number(target.value));
                            }}
                            className={styles.input}
                            data-testid="quantity"
                        />
                        <Select
                            value={cur1}
                            onChange={({ target }) => {
                                setResult(null);
                                setCur1(target.value);
                                setCur2(
                                    Object.keys(rates[target.value]).sort()[0]
                                );
                            }}
                            className={styles.select}
                            data-testid="cur1"
                        >
                            {cur1List.map((cur) => (
                                <option key={cur} value={cur}>
                                    {cur}
                                </option>
                            ))}
                        </Select>
                        <Select
                            value={cur2}
                            onChange={({ target }) => {
                                setResult(null);
                                setCur2(target.value);
                            }}
                            className={styles.select}
                            data-testid="cur2"
                        >
                            {cur2List.map((cur) => (
                                <option key={cur} value={cur}>
                                    {cur}
                                </option>
                            ))}
                        </Select>

                        <Button
                            onClick={() =>
                                setResult(quantity * rates[cur1][cur2])
                            }
                            disabled={!quantity}
                            className={styles.button}
                            data-testid="calculate"
                        >
                            Расссчитать
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                {result !== null && (
                    <div className={styles.result}>
                        <div className={styles.labelResult}>Итого</div>
                        <div
                            className={styles.value}
                            data-testid="result_value"
                        >
                            {result.toFixed(2)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

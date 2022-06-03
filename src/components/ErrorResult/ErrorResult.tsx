import React, { forwardRef } from "react";
import classNames from "classnames";

import { Button } from "../Button/Button";

import styles from "./ErrorResult.module.css";

export const ErrorResult = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        error: string | null;
        onRefresh(): void;
    }
>(({ className, error, onRefresh, ...other }, ref) => (
    <div ref={ref} {...other} className={classNames(styles.error, className)}>
        <h2>Произошла ошибка при получении котировок</h2>
        <p>{error}</p>
        <Button data-testid="refresh" onClick={onRefresh}>
            Обновить
        </Button>
    </div>
));

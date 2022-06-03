import React, { forwardRef } from "react";
import classNames from "classnames";

import styles from "./Select.module.css";

export const Select = forwardRef<
    HTMLSelectElement,
    React.SelectHTMLAttributes<HTMLSelectElement> & {
        error?: boolean;
    }
>(({ children, className, error = false, ...other }, ref) => (
    <select
        ref={ref}
        className={classNames(styles.select, error && styles.error, className)}
        {...other}
    >
        {children}
    </select>
));

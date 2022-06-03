import React, { forwardRef } from "react";
import classNames from "classnames";

import styles from "./Input.module.css";

export const Input = forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & {
        error?: boolean;
    }
>(({ children, className, error = false, ...other }, ref) => (
    <input
        ref={ref}
        {...other}
        className={classNames(styles.input, error && styles.error, className)}
    />
));

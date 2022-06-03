import React, { forwardRef } from "react";
import classNames from "classnames";

import styles from "./Table.module.css";

export const Table = forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement>
>(({ children, className, ...other }, ref) => (
    <table ref={ref} {...other} className={classNames(styles.table, className)}>
        {children}
    </table>
));

export const Thead = forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, className, ...other }, ref) => (
    <thead ref={ref} {...other} className={classNames(styles.thead, className)}>
        {children}
    </thead>
));

export const TBody = forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, className, ...other }, ref) => (
    <tbody ref={ref} {...other} className={classNames(styles.tbody, className)}>
        {children}
    </tbody>
));

export const TRow = forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ children, className, ...other }, ref) => (
    <tr ref={ref} {...other} className={classNames(styles.tr, className)}>
        {children}
    </tr>
));

export const Th = forwardRef<
    HTMLTableCellElement,
    React.HTMLAttributes<HTMLTableCellElement>
>(({ children, className, ...other }, ref) => (
    <th ref={ref} {...other} className={classNames(styles.th, className)}>
        {children}
    </th>
));

export const Td = forwardRef<
    HTMLTableCellElement,
    React.HTMLAttributes<HTMLTableCellElement>
>(({ children, className, ...other }, ref) => (
    <td ref={ref} {...other} className={classNames(styles.td, className)}>
        {children}
    </td>
));

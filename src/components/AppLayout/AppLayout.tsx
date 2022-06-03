import React, { ReactNode } from "react";

import styles from "./AppLayout.module.css";

export const AppLayout: React.FC<{
    header?: ReactNode;
    children?: ReactNode;
}> = ({ header, children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.head}>
                <div className={styles.headLeft}>TEST SPA app</div>
                <div className={styles.headRight}>{header}</div>
            </div>
            <div className={styles.body}>{children}</div>
        </div>
    );
};

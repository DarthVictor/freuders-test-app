import { memo } from "react";
import { shallowEqual } from "react-redux";
import classNames from "classnames";

import styles from "./Tabs.module.css";

type Tab = {
    id: string | number;
    name: string;
};

type TabsProps = {
    selected: string;
    onSelect(id: string | number): void;
    tabs: Tab[];
};

export const Tabs = memo(({ tabs, selected, onSelect }: TabsProps) => {
    return (
        <div className={styles.tabs}>
            {tabs.map(({ id, name }) => (
                <div
                    key={id}
                    className={classNames(
                        styles.tab,
                        selected === id && styles.selected
                    )}
                    onClick={() => onSelect(id)}
                >
                    {name}
                </div>
            ))}
        </div>
    );
}, shallowEqual);

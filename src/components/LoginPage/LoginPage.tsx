import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button/Button";
import { ArrowRight } from "../Icons/ArrowRight/ArrowRight";
import { Input } from "../Input/Input";

import { loginAction } from "../../store/login/loginActions";
import { loginSelector } from "../../store/login/loginSelectors";
import { AppDispatch } from "../../store/store";

import styles from "./LoginPage.module.css";

export const LoginPage: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { error, loading } = useSelector(loginSelector);
    const disabled = loading || !login || !password;
    const hasError = Boolean(error);
    const submitForm = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginAction(login, password));
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.header}>Вход в личный кабинет</div>
            <div className={styles.body}>
                <form className={styles.form} onSubmit={submitForm}>
                    <div className={styles.labelInput}>
                        <label>Логин</label>
                        <Input
                            autoFocus
                            error={hasError}
                            name="login"
                            value={login}
                            type="email"
                            onChange={({ target }) => setLogin(target.value)}
                        />
                    </div>
                    <div className={styles.labelInput}>
                        <label>Пароль</label>
                        <Input
                            error={hasError}
                            name="login"
                            value={password}
                            type="password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <Button
                        disabled={disabled}
                        className={styles.submit}
                        type="submit"
                    >
                        Вход <ArrowRight />
                    </Button>
                    <div className={styles.error}>{error}</div>
                </form>
            </div>
        </div>
    );
};

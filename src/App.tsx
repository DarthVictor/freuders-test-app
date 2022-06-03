import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { Button } from "./components/Button/Button";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { QuotesPage } from "./components/QuotesPage/QuotesPage";
import { logoutAction } from "./store/login/loginActions";
import { isLoggedInSelector } from "./store/login/loginSelectors";
import { AppDispatch } from "./store/store";

import styles from "./App.module.css";

function App() {
    const isLoggedIn = useSelector(isLoggedInSelector);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <AppLayout
            header={
                isLoggedIn && (
                    <Button
                        onClick={() => dispatch(logoutAction())}
                        appearence="secondary"
                        className={styles.logout}
                    >
                        Выход
                    </Button>
                )
            }
        >
            {isLoggedIn ? <QuotesPage /> : <LoginPage />}
        </AppLayout>
    );
}

export default App;

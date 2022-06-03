import { useDispatch, useSelector } from "react-redux";

import { Tabs } from "../Tabs/Tabs";
import { QuotesTable } from "../QuotesTable/QuotesTable";
import { Converter } from "../Converter/Converter";
import { History } from "../History/History";

import { setTab } from "../../store/tabs/tabsSlice";
import { AppDispatch, RootState } from "../../store/store";
import { TabId } from "../../store/types";

export const QuotesPage: React.FC = () => {
    const { tab, tabs } = useSelector((state: RootState) => state.tabs);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <Tabs
                selected={tab}
                onSelect={(tabId) => dispatch(setTab(tabId as TabId))}
                tabs={tabs}
            />
            {tab === TabId.QUOTES && <QuotesTable />}
            {tab === TabId.CONVERTER && <Converter />}
            {tab === TabId.HISTORY && <History />}
        </div>
    );
};

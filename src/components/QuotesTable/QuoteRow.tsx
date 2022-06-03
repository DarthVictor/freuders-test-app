import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import { Td, TRow } from "../Table/Table";
import { Star } from "../Icons/Star/Star";

import { makeQuoteSelector } from "../../store/quotes/quotesSelectors";
import { toggleQuote } from "../../store/quotes/quotesActions";

type QuoteRowProps = {
    favourite?: boolean;
    asset: string;
};

export const QuoteRow: React.FC<QuoteRowProps> = memo(
    ({ favourite = false, asset }) => {
        const { quote, startDate } = useSelector(makeQuoteSelector(asset));
        const dispatch = useDispatch();

        return (
            <TRow data-testid="QuoteRow">
                <Td>
                    <Star
                        checked={favourite}
                        onClick={() => dispatch(toggleQuote(asset))}
                        data-testid={`add_${asset}_to_favourites`}
                    />
                </Td>
                <Td>{asset} </Td>
                <Td>{quote}</Td>
                <Td>{format(new Date(startDate), "dd.MM.yyyy")}</Td>
            </TRow>
        );
    }
);

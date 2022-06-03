import React, { forwardRef } from "react";

export const ArrowRight = forwardRef<
    SVGSVGElement,
    React.SVGAttributes<SVGSVGElement>
>(({ children, className, ...other }, ref) => (
    <svg
        width="26"
        height="12"
        viewBox="0 0 26 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        ref={ref}
        {...other}
    >
        <path
            d="M1 5.94118H25M25 5.94118L19.5455 1M25 5.94118L19.5455 10.8824"
            stroke="currentColor"
            strokeLinecap="round"
        />
    </svg>
));

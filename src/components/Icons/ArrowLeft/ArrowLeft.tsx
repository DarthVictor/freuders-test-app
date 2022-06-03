import React, { forwardRef } from "react";

export const ArrowLeft = forwardRef<
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
            d="M25 5.94118H0.999999M0.999999 5.94118L6.45454 1M0.999999 5.94118L6.45454 10.8824"
            stroke="currentColor"
            strokeLinecap="round"
        />
    </svg>
));

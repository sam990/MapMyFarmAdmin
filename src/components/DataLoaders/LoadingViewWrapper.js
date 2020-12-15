import React from "react";

import { MoonLoader } from "react-spinners";

export default function LoadingViewWrapper(currState, modifierFunction = (e => e), isBold = true) {
    if (currState === -1) {
        return (
            <MoonLoader color="#1d8cf8" size="12px" />
        );
    }
    else if (currState === -2) {
        return (
            <span className="text-error">err</span>
        );
    } else {
        const finalVal = modifierFunction(currState);
        return (
            isBold ? <strong>{finalVal}</strong> : <span>{finalVal}</span>
        );
    }
}
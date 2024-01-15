import React from 'react';

export function FormatNumber({ number }: { number: number }) {
    const parts = number.toLocaleString(undefined, {
        minimumFractionDigits: 2
    }).split(",");
    if (parts.length === 1) {
        return <>{number}</>;
    }
    const mainPart = `${parts[0]},${parts[1].substring(0, 2)}`;
    const decimalPart = parts[1].substring(2);

    return (
        <>
            {mainPart}
            <span style={{ color: 'grey' }}>{decimalPart}</span>
        </>
    );
}
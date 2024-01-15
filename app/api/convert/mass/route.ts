import { NextResponse } from "next/server";
import { mass } from "@/data/mass";

import axios from "axios";
import qs from "query-string";

export async function POST(req: Request) {
    try {
        const { from, to, amount } = await req.json();

        const newAmount = parseFloat(amount.replace(",", "."));

        const fromValue = mass.get(from);
        const toValue = mass.get(to);

        if (!fromValue || !toValue) {
            return new NextResponse("Invalid mass", { status: 400 });
        }

        const rate = fromValue / toValue;
        const result = newAmount * rate;

        return NextResponse.json({
            from: from,
            to: to,
            amount: newAmount,
            rate: rate,
            result: result
        });
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
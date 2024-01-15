import { NextResponse } from "next/server";
import { volume } from "@/data/volume";

import axios from "axios";
import qs from "query-string";

export async function POST(req: Request) {
    try {
        const { from, to, amount } = await req.json();

        const newAmount = parseFloat(amount.replace(",", "."));

        const fromValue = volume.get(from);
        const toValue = volume.get(to);

        if (!fromValue || !toValue) {
            return new NextResponse("Invalid volume", { status: 400 });
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
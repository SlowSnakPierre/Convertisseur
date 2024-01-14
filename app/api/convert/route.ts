import { NextResponse } from "next/server";

import axios from "axios";
import qs from "query-string";

export async function POST(req: Request) {
    try {
        const { from, to, amount } = await req.json();

        const newAmount = parseFloat(amount);

        const url = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/pair/${from}/${to}/${newAmount}`;

        let data: Record<string, any> | null = null;
        let error = null;

        await axios.get(url).then((response) => {
            data = response.data;
        }).catch((err) => {
            error = err;
        });

        if (data == null) {
            console.log("[SERVERS_POST]", error);
            return new NextResponse("Internal Error", { status: 500 });
        }

        return NextResponse.json({
            from: from,
            to: to,
            amount: newAmount,
            rate: data["conversion_rate"],
            result: data["conversion_result"]
        });
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
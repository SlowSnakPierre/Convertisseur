import { NextResponse } from "next/server";

import axios from "axios";
import qs from "query-string";

function remapFlag(str: string) {
    return str.substring(0, 2);
}

export async function GET(req: Request) {
    try {
        const url = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/codes`;

        let data = null;
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

        const finalData = data["supported_codes"].map((item: string) => {
            return [item[0], item[1], remapFlag(item[0])];
        });

        return NextResponse.json(
            finalData
        );
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
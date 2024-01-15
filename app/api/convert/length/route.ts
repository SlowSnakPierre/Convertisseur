import { NextResponse } from "next/server";
import { length } from "@/data/length";

export async function POST(req: Request) {
    try {
        const { from, to, amount } = await req.json();

        const newAmount = parseFloat(amount.replace(",", "."));

        const fromValue = length.get(from);
        const toValue = length.get(to);

        if (!fromValue || !toValue) {
            return new NextResponse("Invalid length", { status: 400 });
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
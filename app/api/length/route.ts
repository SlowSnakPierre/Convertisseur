import { NextResponse } from "next/server";

import { length } from "@/data/length";

export async function GET(req: Request) {
    try {
        return NextResponse.json(Array.from(length.keys()));
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
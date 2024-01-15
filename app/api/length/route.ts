import { NextResponse } from "next/server";

import axios from "axios";
import qs from "query-string";
import { length } from "@/data/length";

export async function GET(req: Request) {
    try {
        return NextResponse.json(Array.from(length.keys()));
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
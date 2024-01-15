import { NextResponse } from "next/server";

import axios from "axios";
import qs from "query-string";
import { mass } from "@/data/mass";

export async function GET(req: Request) {
    try {
        return NextResponse.json(Array.from(mass.keys()));
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
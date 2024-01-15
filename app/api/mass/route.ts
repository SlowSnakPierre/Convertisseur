import { NextResponse } from "next/server";

import { mass } from "@/data/mass";

export async function GET(req: Request) {
    try {
        return NextResponse.json(Array.from(mass.keys()));
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
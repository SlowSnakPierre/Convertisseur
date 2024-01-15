import { NextResponse } from "next/server";

import { volume } from "@/data/volume";

export async function GET(req: Request) {
    try {
        return NextResponse.json(Array.from(volume.keys()));
    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
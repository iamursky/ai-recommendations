import { NextResponse, type NextRequest } from "next/server";

import { ApiErrors } from "@/modules/app";
import { getTopics } from "@/modules/topics";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("query") ?? "";
    const limit = Number(searchParams.get("limit") ?? 10);
    const offset = Number(searchParams.get("offset") ?? 0);

    return NextResponse.json(getTopics({ query, limit, offset }));
  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json({ error: ApiErrors.ServerError }, { status: 500 });
  }
}

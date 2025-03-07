import { NextResponse, type NextRequest } from "next/server";

import { ApiErrors } from "@/modules/app";
import { getRecommendations } from "@/modules/ai";

type TBody = {
  city: string;
  topic: string;
};

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY environment variable");
    }

    const { city, topic } = (await request.json()) as TBody;

    if (!city || !topic) {
      return NextResponse.json({ error: ApiErrors.BadRequest }, { status: 400 });
    }

    return getRecommendations({ city, topic });
  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json({ error: ApiErrors.ServerError }, { status: 500 });
  }
}

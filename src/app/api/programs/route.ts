import { NextResponse } from "next/server";
import { fetchProgramRowsFromPublishedSheet } from "@/lib/programSheet";

const GOOGLE_PUBLISHED_KEY = "2PACX-1vTVYeaBXI-jaNp7LKAcCLwaAJcKzMFThLbJwhrlxHGQkz5E8LNEVaSNkcRsQDdMGA9ty-I-_Jee6Egc";
const GOOGLE_SHEET_GID = "26836468";

export async function GET() {
  try {
    const rows = await fetchProgramRowsFromPublishedSheet(
      GOOGLE_PUBLISHED_KEY,
      GOOGLE_SHEET_GID,
      Date.now().toString()
    );

    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch program rows from published Google Sheet", error);
    return NextResponse.json({ rows: [] }, { status: 200 });
  }
}

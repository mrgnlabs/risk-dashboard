import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// This is just a temporary solution to serve the CSV files
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenSymbol = searchParams.get("tokenSymbol");
  const type = searchParams.get("type");

  if (!tokenSymbol || !type) {
    return NextResponse.json(
      { error: "Missing tokenSymbol or type query parameters" },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "csv",
      `${tokenSymbol}-${type}-model-output.csv`
    );

    if (fs.existsSync(filePath)) {
      const csvData = fs.readFileSync(filePath, "utf8");
      return NextResponse.json({ data: csvData }, { status: 200 });
    } else {
      console.error(`File not found: ${filePath}`);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error reading CSV file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

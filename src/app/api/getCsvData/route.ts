import { NextResponse } from "next/server";

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
    const fileUrl = `https://storage.googleapis.com/mrgn-public/risk-model-output/${tokenSymbol}-${type}-model-output.csv`;
    const response = await fetch(fileUrl);

    if (response.ok) {
      const csvData = await response.text();

      return NextResponse.json(
        { data: csvData },
        {
          status: 200,
          headers: {
            "Cache-Control":
              "public, max-age=86400, stale-while-revalidate=43200", // Cache for 1 day, revalidate in 12 hours
          },
        }
      );
    } else if (response.status === 404) {
      console.error(`File not found on Google Cloud Storage: ${fileUrl}`);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    } else {
      console.error(
        `Failed to fetch file from Google Cloud Storage: ${fileUrl}`
      );
      return NextResponse.json(
        { error: "Failed to fetch file from Google Cloud Storage" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error fetching CSV file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

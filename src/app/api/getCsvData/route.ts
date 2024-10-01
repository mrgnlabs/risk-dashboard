import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenAddress = searchParams.get("tokenAddress");
  const type = searchParams.get("type");

  if (!tokenAddress || !type) {
    return NextResponse.json(
      { error: "Missing tokenSymbol or type query parameters" },
      { status: 400 }
    );
  }

  try {
    const fileUrl = `https://storage.googleapis.com/mrgn-public/risk/${tokenAddress}-${type}-model_output.csv`;
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
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    } else {
      return NextResponse.json(
        { error: "Failed to fetch file from Google Cloud Storage" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

// POST saving sent file to a directory on a server
export async function POST(req: NextRequest) {
  const { fileName } = await req.json();

  if (!fileName)
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "File name required" }
    );

  try {
    const result = await readFile(`/tmp/${fileName}`);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

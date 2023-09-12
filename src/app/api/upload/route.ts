import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

// POST saving sent file to a directory
export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file)
    return NextResponse.json(
      { success: false },
      { status: 400, statusText: "File required" }
    );

  // converting File to a buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // writing file
  const path = `/tmp/${file.name}`;

  try {
    await writeFile(path, buffer);
    return NextResponse.json({ success: true, path });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
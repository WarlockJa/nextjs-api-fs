import { env } from "@/env";
import { Dirent } from "fs";
import { writeFile, readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// POST saving sent file to a directory on a server
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
  const path = `/${env.NEXT_PUBLIC_FOLDER_PATH}/${file.name}`;

  try {
    await writeFile(path, buffer);
    return NextResponse.json({ success: true, path });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

const filterFiles = (direntsArray: Dirent[]) => {
  return direntsArray
    .filter((dirent) => dirent.isFile())
    .map((file) => file.name);
};

export async function GET(req: NextRequest) {
  // TEST
  const url = new URL(req.url);
  const dirPath = url.searchParams.get("path");
  const directoryPath = path.join(
    "/",
    dirPath ? dirPath : env.NEXT_PUBLIC_FOLDER_PATH
  );
  // TEST
  // const directoryPath = path.join("/", env.NEXT_PUBLIC_FOLDER_PATH);
  try {
    const result = await readdir(directoryPath, { withFileTypes: true });
    const files = filterFiles(result);
    // return NextResponse.json(files);
    // TEST
    return NextResponse.json(result);
  } catch (error) {
    //handling error
    return NextResponse.json({ error });
  }
}

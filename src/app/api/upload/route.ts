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

  await writeFile(path, buffer);
  return NextResponse.json({ success: true, path });
}

// import { writeFile } from "fs/promises";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const data = await request.formData();
//   const file: File | null = data.get("file") as unknown as File;

//   if (!file) {
//     return NextResponse.json({ success: false });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   // With the file data in the buffer, you can do whatever you want with it.
//   // For this, we'll just write it to the filesystem in a new location
//   const path = `/tmp/${file.name}`;
//   await writeFile(path, buffer);
//   console.log(`open ${path} to see the uploaded file`);

//   return NextResponse.json({ success: true });
// }

import { readFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const downloadFileSchema = z.object({
  path: z.string({ required_error: "file path required" }).min(1),
  name: z.string({ required_error: "file name required" }).min(1),
  size: z.coerce
    .number({ required_error: "file size required" })
    .min(0, { message: "file size must be a positive number" }),
});

export async function GET(req: NextRequest) {
  // reading url params
  const url = new URL(req.url);
  const path = url.searchParams.get("path");
  const name = url.searchParams.get("name");
  const size = url.searchParams.get("size");

  try {
    // validating params
    const data = downloadFileSchema.parse({ path, name, size });

    // reading file
    const file = await readFile(data.path.concat("/", data.name));
    return new NextResponse(file, {
      headers: {
        "Content-Disposition": `attachment; filename="${data.name}"`,
        "Content-Length": data.size.toString(),
      },
    });
  } catch (error) {
    return notFound();
  }
}

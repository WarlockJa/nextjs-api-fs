"use server";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export async function deleteFile({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  await fs.unlink(`${path}/${name}`);

  revalidatePath("/");
}

"use server";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export async function deleteFolder({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  await fs.rmdir(`${path}/${name}`, { recursive: true });

  revalidatePath("/");
}

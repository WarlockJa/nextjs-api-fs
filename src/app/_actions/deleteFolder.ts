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
  await fs.rm(`${path}/${name}`, { recursive: true, force: true });

  revalidatePath("/");
}

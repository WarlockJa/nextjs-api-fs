"use server";
import fs from "fs/promises";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// there is no regex for name validation because various environment have their own restrictions
// if folder name is invalid generic error will be dispatched
const folderSchema = z.object({
  folder: z.string().min(1).max(255),
});

export async function createFolder(
  path: string,
  prevState: unknown,
  formData: FormData
) {
  // validating form data
  const result = folderSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const folder = result.data.folder;

  try {
    await fs.mkdir(`${path}/${folder}`);
  } catch (error) {
    return { folder: "Error creating folder" };
  }

  revalidatePath("/");
}

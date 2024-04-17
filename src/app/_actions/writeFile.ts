"use server";
import fs from "fs/promises";
import { File } from "buffer";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const fileSchema = z.object({
  file: z
    .instanceof(File, { message: "Required" })
    .refine((file) => file.size > 0, "Required"),
});

export async function writeFile(
  path: string,
  prevState: unknown,
  formData: FormData
) {
  // validating form data
  const result = fileSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const file = result.data.file;

  await fs.writeFile(
    `${path}/${file.name}`,
    Buffer.from(await file.arrayBuffer())
  );

  revalidatePath("/");
}

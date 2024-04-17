"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteFile } from "../_actions/deleteFile";

export function DropdownDeleteFile({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteFile({ name, path });
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
}

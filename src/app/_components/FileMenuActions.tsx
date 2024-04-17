"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteFile } from "../_actions/deleteFile";
import { deleteFolder } from "../_actions/deleteFolder";

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

export function DropdownDeleteFolder({
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
          await deleteFolder({ name, path });
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
}

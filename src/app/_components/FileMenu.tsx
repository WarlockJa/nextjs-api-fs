import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DropdownDeleteFile } from "./FileMenuActions";

export default function FileMenu({
  name,
  path,
  size,
}: {
  name: string;
  path: string;
  size: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
        <span className="sr-only">Actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link
            download
            href={`/download/?path=${path}&name=${name}&size=${size}`}
          >
            Download
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownDeleteFile name={name} path={path} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

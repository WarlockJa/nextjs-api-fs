import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DropdownDeleteFolder } from "./FileMenuActions";

export default function FolderMenu({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical />
        <span className="sr-only">Actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownDeleteFolder name={name} path={path} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

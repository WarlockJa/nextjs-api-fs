import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
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
        <MoreVertical />
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
        {/* <DropdownDownloadFile name={name} path={path} size={size} /> */}
        {/* <DropdownMenuItem asChild>
          <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <ActiveToggleDropdownItem
          id={product.id}
          isAvailableForPurchase={product.isAvailableForPurchase}
        /> */}
        <DropdownMenuSeparator />
        <DropdownDeleteFile name={name} path={path} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
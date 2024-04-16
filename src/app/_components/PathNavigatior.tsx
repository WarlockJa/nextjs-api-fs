import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

export default function PathNavigator({ path }: { path: string }) {
  // generating path entries array
  const upHref =
    path === "/"
      ? [{ name: "/", href: "/" }]
      : path
          .split("/")
          .map((_, index, arr) =>
            index < arr.length - 1
              ? {
                  name: arr[arr.length - index - 1],
                  href: arr.slice(0, arr.length - index).join("/"),
                }
              : { name: "/", href: "/" }
          )
          .reverse();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {upHref.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {index < upHref.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link className="text-lg" href={`?path=${item.href}`}>
                    {item.name}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-lg">{item.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < upHref.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

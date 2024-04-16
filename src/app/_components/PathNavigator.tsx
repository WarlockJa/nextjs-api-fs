import React from "react";

export default function PathNavigator({ path }: { path: string }) {
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
    <div className="navigationList">
      {upHref.map((item, index) => (
        <React.Fragment key={item.href}>
          {index < upHref.length - 1 ? (
            <a className="navLink" href={`?path=${item.href}`}>
              {item.name}
            </a>
          ) : (
            <p>{item.name}</p>
          )}
          {index < upHref.length - 1 && <p>{">"}</p>}
        </React.Fragment>
      ))}
    </div>
  );
}

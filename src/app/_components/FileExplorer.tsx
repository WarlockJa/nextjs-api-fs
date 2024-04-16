import { readdir } from "fs/promises";
import { redirect } from "next/navigation";
import PathNavigator from "./PathNavigatior";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import fs from "fs/promises";
import getSize from "@/lib/getSize";

export default async function FileExplorer({ path }: { path: string }) {
  let files;
  try {
    const result = await readdir(path, { withFileTypes: true });

    files = await Promise.all(
      result.map(async (entry) => {
        const isFile = entry.isFile();
        const stats = isFile && (await fs.stat(entry.path + "/" + entry.name));
        // return { ...entry, ...stats };
        return { ...entry, isFile, size: stats ? stats.size : null };
      })
    );
  } catch (error) {
    console.log(error);
    redirect("/?path=/");
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PathNavigator path={path} />
        <ThemeToggle />
      </div>
      <ul className="overflow-scroll h-[95vh] px-4">
        {files.map((file) => (
          <li key={file.name} className="listItem">
            {file.isFile ? (
              <div className="flex justify-between text-muted-foreground hover:bg-secondary">
                <p>{file.name}</p>
                <p>{file.size && getSize(file.size)}</p>
              </div>
            ) : (
              <div className="hover:bg-secondary">
                <Link
                  href={`/?path=${
                    file.path === "/" ? file.path : `${file.path}/`
                  }${file.name}`}
                >
                  {file.name}
                </Link>
                {/* <a
                  href={`/?path=${
                    file.path === "/" ? file.path : `${file.path}/`
                  }${file.name}`}
                >
                  {file.name}
                </a> */}
                {/* {file.path.includes("products") && (
            <>
              <button asChild>
                <a href={`/admin/fstest/files/${file.name}`}>Download</a>
              </button>
              <DeleteFile filename={file.name} />
            </>
          )} */}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

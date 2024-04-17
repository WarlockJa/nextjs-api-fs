import { readdir } from "fs/promises";
import { redirect } from "next/navigation";
import PathNavigator from "./PathNavigatior";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import fs from "fs/promises";
import getSize from "@/lib/getSize";
import FileMenu from "./FileMenu";
import UploadFile from "./UploadFile";
import CreateFolder from "./CreateFolder";
import FolderMenu from "./FolderMenu";

export default async function FileExplorer({ path }: { path: string }) {
  let entries;
  try {
    const result = await readdir(path, { withFileTypes: true });

    entries = await Promise.all(
      result.map(async (entry) => {
        const isFile = entry.isFile();
        const stats = isFile && (await fs.stat(entry.path + "/" + entry.name));
        return { ...entry, isFile, size: stats ? stats.size : null };
      })
    );
  } catch (error) {
    console.log(error);
    redirect("/?path=/");
  }

  return (
    <div className="overflow-scroll h-full">
      <div className="flex justify-between items-center sticky top-0 bg-secondary">
        <PathNavigator path={path} />
        <div className="flex items-center">
          <CreateFolder path={path} />
          <UploadFile path={path} />
          <ThemeToggle />
        </div>
      </div>
      <ul className="px-4">
        {entries.map((entry) => (
          <li key={entry.name} className="listItem">
            {entry.isFile ? (
              <div className="flex justify-between text-muted-foreground hover:bg-secondary">
                <p>{entry.name}</p>
                <div className="flex">
                  <p>{entry.size && getSize(entry.size)}</p>
                  <FileMenu
                    name={entry.name}
                    path={entry.path}
                    size={entry.size ? entry.size : 0}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-between hover:bg-secondary">
                <Link
                  href={`/?path=${
                    entry.path === "/" ? entry.path : `${entry.path}/`
                  }${entry.name}`}
                >
                  {entry.name}
                </Link>
                <FolderMenu name={entry.name} path={entry.path} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

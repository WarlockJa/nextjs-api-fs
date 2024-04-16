import { readdir } from "fs/promises";
import { redirect } from "next/navigation";
import "./fileexplorer.css";
import PathNavigator from "./PathNavigator";

export default async function FileExplorer({ path }: { path: string }) {
  let files;
  try {
    const result = await readdir(path, { withFileTypes: true });

    files = result.map((entry) =>
      entry.isFile() ? { ...entry, file: true } : { ...entry, file: false }
    );
  } catch (error) {
    redirect("/?path=/");
  }

  return (
    <div className="fileExplorer">
      <PathNavigator path={path} />
      <ul className="filesList">
        {files.map((file) => (
          <li key={file.name} className="listItem">
            {file.file ? (
              <p>{file.name}</p>
            ) : (
              // <p>
              //   {file.path === "/" ? "" : file.path}/{file.name}
              // </p>
              <div>
                <a
                  className="listLink"
                  href={`/?path=${
                    file.path === "/" ? file.path : `${file.path}/`
                  }${file.name}`}
                >
                  {file.name}
                </a>
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
    </div>
  );
}

"use client";
import { useState } from "react";

export default function GetDirFiles() {
  const [files, setFiles] = useState([]);
  const [fetching, setFetching] = useState(false);

  const handleGetFiles = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/upload", {
        method: "GET",
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());

      const filesArray = await res.json();
      setFiles(filesArray);
      setFetching(false);
    } catch (e: any) {
      // Handle errors here
      console.error(e);
      setFetching(false);
    }
  };
  return (
    <div>
      {!fetching && <button onClick={() => handleGetFiles()}>Get Files</button>}
      <ul>
        {files.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
}

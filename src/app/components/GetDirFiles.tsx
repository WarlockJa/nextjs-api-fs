"use client";
import { useState } from "react";
import "./getdirfiles.css";
import { useAtom } from "jotai";
import { pathAtom } from "@/jotai";

export default function GetDirFiles() {
  const [files, setFiles] = useState([]);
  const [fetching, setFetching] = useState(false);

  // handle files list
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
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
    setFetching(false);
  };

  // downloading file from the server
  const downloadFile = async (fileName: string) => {
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        body: JSON.stringify({ fileName }),
      }).then((response) => response.json());

      if (!res.success) {
        console.log(res.error);
      } else {
        // file comes as Buffer
        const buffer = Buffer.from(res.data);
        // converting Buffer to blob
        const blob = new Blob([buffer]);
        // creating browser element a to save file
        const a = document.createElement("a");
        // assigning href to the blob
        a.href = URL.createObjectURL(blob);
        // assigning name of the file same as in the list
        a.download = fileName;
        // initiating file save
        a.click();
        // removing element
        URL.revokeObjectURL(a.href);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // TEST
  const [dirPath, setDirPath] = useAtom(pathAtom);
  // handle files list
  const handleGetDirFiles = async () => {
    setFetching(true);
    try {
      const res = await fetch(`/api/upload?path=${dirPath}`, {
        method: "GET",
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());

      const filesArray = await res.json();
      setFiles(filesArray);
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
    setFetching(false);
  };

  return (
    <section>
      <button onClick={() => handleGetFiles()} disabled={fetching}>
        Get Files
      </button>
      {/* TEST */}
      <div>
        <label htmlFor="dirPath">{dirPath}</label>
        <input
          id="dirPath"
          type="text"
          onChange={(e) => setDirPath(e.target.value)}
        />
        <button onClick={() => handleGetDirFiles()}>Get {dirPath} Files</button>
      </div>
      {/* TEST */}
      <ul className="filesList">
        {files.map((dir, index) => (
          <li key={index}>
            <pre>{JSON.stringify(dir, null, 2)}</pre>
          </li>
        ))}
        {/* {files.length === 0 ? (
          <div className="separator"></div>
        ) : (
          files.map((file) => (
            <li
              key={file}
              className="listItem"
              onClick={() => downloadFile(file)}
            >
              {file}
            </li>
          ))
        )} */}
      </ul>
    </section>
  );
}

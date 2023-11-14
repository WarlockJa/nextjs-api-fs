"use client";
import { useState } from "react";
import "./getdirfiles.css";

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

  return (
    <section>
      <button onClick={() => handleGetFiles()} disabled={fetching}>
        Get Files
      </button>
      <ul className="filesList">
        {files.length === 0 ? (
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
        )}
      </ul>
    </section>
  );
}

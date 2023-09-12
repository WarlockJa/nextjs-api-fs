"use client";
import { useState } from "react";

export default function GetDirFiles() {
  const [files, setFiles] = useState();
  const handleGetFiles = () => {};
  return (
    <div>
      <button onClick={() => handleGetFiles()}>Get Files</button>
    </div>
  );
}

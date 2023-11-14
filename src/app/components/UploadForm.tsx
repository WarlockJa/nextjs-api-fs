"use client";

import { useState } from "react";

export function UploadForm() {
  const [file, setFile] = useState<File | undefined>(undefined);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) {
        throw new Error(await res.text());
      } else {
        setFile(undefined);
      }

      console.log(res.json());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" disabled={!file} />
    </form>
  );
}

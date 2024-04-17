"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MehIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { writeFile } from "../_actions/writeFile";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function UploadFile({ path }: { path: string }) {
  const [error, action] = useFormState(writeFile.bind(null, path), {});

  const formRef = useRef(null);

  return (
    <form action={action} ref={formRef}>
      <Label htmlFor="file" className="cursor-pointer" title="upload file">
        <span className="sr-only">
          {error?.file ? "invalid file input" : "upload file"}
        </span>
        <Button variant="outline" size="icon" asChild>
          {error?.file ? (
            <MehIcon className="p-2 text-destructive" />
          ) : (
            <UploadIcon className="p-2" />
          )}
        </Button>
      </Label>
      <SubmitInput form={formRef} />
    </form>
  );
}

function SubmitInput({ form }: { form: any }) {
  const { pending } = useFormStatus();
  return (
    <Input
      className="hidden"
      type="file"
      id="file"
      name="file"
      onChange={() => form.current && form.current.requestSubmit()}
      disabled={pending}
    />
  );
}

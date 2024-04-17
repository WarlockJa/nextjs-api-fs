"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderCheckIcon, FolderClockIcon, FolderPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createFolder } from "../_actions/createFolder";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRef, useState } from "react";

export default function CreateFolder({ path }: { path: string }) {
  const [error, action] = useFormState(createFolder.bind(null, path), {});

  const [inputValue, setInputValue] = useState("");
  const formRef = useRef(null);

  return (
    <form action={action} ref={formRef}>
      <input
        type="text"
        id="folder"
        name="folder"
        required
        value={inputValue}
        className="hidden"
        readOnly
      />
      <Popover>
        <PopoverTrigger title="add folder">
          <Button variant="outline" size="icon" asChild>
            <FolderPlusIcon className="p-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={
            error?.folder
              ? "flex gap-1 outline outline-destructive"
              : "flex gap-1"
          }
        >
          <Label htmlFor="folder" className="cursor-pointer">
            <span className="sr-only">
              {error?.folder ? "error creating folder" : "create folder"}
            </span>
          </Label>
          <Input
            type="text"
            required
            className="rounded-r-none"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <SubmitButton form={formRef} />
        </PopoverContent>
      </Popover>
    </form>
  );
}
function SubmitButton({ form }: { form: any }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-l-none"
      type="submit"
      disabled={pending}
      onClick={() => form.current && form.current.requestSubmit()}
    >
      {pending ? <FolderClockIcon /> : <FolderCheckIcon />}
    </Button>
  );
}

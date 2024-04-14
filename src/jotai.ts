import { atom } from "jotai";
import { env } from "./env";

export const pathAtom = atom(env.NEXT_PUBLIC_FOLDER_PATH);

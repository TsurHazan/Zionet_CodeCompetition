import { createContext } from "react";
import { atom } from "recoil";
export const taskObjToEdit = createContext();

export const submitTaskSucceeded = atom({
  key: "submitTaskSucceeded",
  default: true,
});

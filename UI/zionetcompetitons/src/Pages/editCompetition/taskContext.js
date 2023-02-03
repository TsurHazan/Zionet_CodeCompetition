import { createContext } from "react";
import { atom } from "recoil";
export const taskObjToEdit = createContext();

export const submitTask = atom({
  key: "submitTask",
  default: [],
});

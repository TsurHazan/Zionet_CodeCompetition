import { createContext } from "react";
import { atom } from "recoil";

export const editCompetition = createContext();

export const editCompetition_atom = atom({
  key: "editCompetition_atom",
  default: {},
});

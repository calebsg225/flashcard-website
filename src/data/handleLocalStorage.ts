// functions for handling localStorage interactions

import { SetData } from "../types/setDataTypes";

// retrieve a set
const retrieveSet = (setKey: string): SetData => {
  const retrievedSet = localStorage.getItem(setKey);
  return retrievedSet ? JSON.parse(retrievedSet) : {};
}

// replace existing set data with a new set
const replaceSet = (setKey: string, setData: SetData) => {
  localStorage.setItem(setKey, JSON.stringify(setData));
}

// delete a set
const deleteSet = (setKey: string) => {
  localStorage.removeItem(setKey);
}

export { retrieveSet, replaceSet, deleteSet };
// functions for handling localStorage interactions

import { SetData } from "../types/setDataTypes";

const localStorageKey = 'flashcard_website_set_data';

// gets complete set data from localStorage
const getSetsData = (): {[key: string]: SetData} => {
  const sets = localStorage.getItem(localStorageKey);
  return sets ? JSON.parse(sets) : {};
}

// create a new set
const createSet = (setKey: string, setData: SetData): void => {
  const sets = getSetsData();
  sets[setKey] = setData;
}

// retrieve a specific set
const retrieveSet = (setKey: string): SetData => {
  const sets = getSetsData();
  const retrievedSet: SetData = sets[setKey];
  return retrievedSet;
}

// update existing set data with a new set
const updateSet = (setKey: string, setData: SetData): void => {
  const sets = getSetsData();
  sets[setKey] = setData;
}

// delete a set
const deleteSet = (setKey: string) => {
  const sets = getSetsData();
  delete sets[setKey];
}

export { createSet, retrieveSet, updateSet, deleteSet };
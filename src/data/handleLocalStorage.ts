// functions for handling localStorage interactions

import { SetData } from "../types/setDataTypes";
import { sampleSets } from "./sample_sets";

// key used to store set data in localStorage
const localStorageSetsKey = 'flashcard_website_set_data';

// key used to store current set in localStorage
const localStorageCurrentSetKey = 'flashcard_website_current_set';

// HANDLE SETS DATA

// gets complete set data from localStorage
const getSetsData = (): {[key: string]: SetData} => {
  const sets = localStorage.getItem(localStorageSetsKey);
  return sets ? JSON.parse(sets) : {};
}

const setSetsData = (data: {[key: string]: SetData}): void => {
  localStorage.setItem(localStorageSetsKey, JSON.stringify(data));
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
  setSetsData(sets);
}

// delete a set
const deleteSet = (setKey: string) => {
  const sets = getSetsData();
  delete sets[setKey];
  setSetsData(sets);
}

// HANDLE CURRENT SET

/*
Current Set Behavior:
- if there is no current set, [use sample data].
- if current set is a set from sets data and that set is deleted, switch to sample data.
*/

// set current set to sample data
const setSampleCurrentSet = (): SetData => {
  const sampleSet: SetData = sampleSets['sample'];
  localStorage.setItem(localStorageCurrentSetKey, JSON.stringify(sampleSet));
  return sampleSet;
}

// get current set
// if set does not exist in localstorage, use sample data
const getCurrentSetData = (): SetData => {
  const set = localStorage.getItem(localStorageCurrentSetKey);
  return set ? JSON.parse(set) : setSampleCurrentSet();
}

// gets the current active set
const retrieveCurrentSet = (): SetData => {
  return getCurrentSetData();
}

// sets the current active set
const updateCurrentSet = (set: SetData) => {
  localStorage.setItem(localStorageCurrentSetKey, JSON.stringify(set));
}

// checks to see if there is currently an active set
const hasCurrentSet = (): boolean => {
  const set = getCurrentSetData();
  if (set.title && set.cards && set.cards.length) return true;
  return false;
}

export {
  retrieveSet, 
  updateSet, 
  deleteSet, 
  getCurrentSetData, 
  retrieveCurrentSet, 
  updateCurrentSet,
  hasCurrentSet
};
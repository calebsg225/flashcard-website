// functions for handling localStorage interactions

import { SetData, Sets } from "../types/setDataTypes";
import { sampleSets } from "./sample_sets";

class HandleLocalStorage {
  localStorageSetsKey: string; // key used to store set data in localStorage
  localStorageCurrentSetKey: string; // key used to store current set in localStorage
  constructor() {
    this.localStorageSetsKey = 'flashcard_website_set_data';
    this.localStorageCurrentSetKey = 'flashcard_website_current_set_id';
  }

  // set current set to sample data
  private setSampleCurrentSet = (): void => {
    localStorage.setItem(this.localStorageCurrentSetKey, 'sample');
  }

  // get current set id
  // if set does not exist in localstorage, use sample data
  private getCurrentSetId = (): string => {
    const setId = localStorage.getItem(this.localStorageCurrentSetKey);
    const currentSetId = setId ? setId : 'sample';
    if (!setId) this.setSampleCurrentSet();
    return currentSetId;
  }

  // gets the current active set data
  retrieveCurrentSetData = (): SetData => {
    const currentSetId = this.getCurrentSetId();
    return currentSetId === 'sample' ? sampleSets[currentSetId] : this.retrieveSet(currentSetId);
  }

  // sets the current active set id
  updateCurrentSet = (setId: string) => {
    localStorage.setItem(this.localStorageCurrentSetKey, (setId.length ? setId : 'sample'));
  }

  // checks to see if there is currently an active set
  hasCurrentSet = (): boolean => {
    return this.getCurrentSetId() !== 'sample';
  }




  // gets and returns complete sets data from localStorage
  getSetsData = (): Sets => {
    const sets = localStorage.getItem(this.localStorageSetsKey);
    return sets ? JSON.parse(sets) : {};
  }

  // replaces sets data in localStorage with new data
  private replaceSetsData = (data: Sets): void => {
    localStorage.setItem(this.localStorageSetsKey, JSON.stringify(data));
  }

  // retrieve a specific set based on the set id
  retrieveSet = (setId: string): SetData => {
    const sets = this.getSetsData();
    const retrievedSet: SetData = sets[setId];
    return retrievedSet;
  }

  // update existing set data with a new set
  updateSet = (setId: string, setData: SetData): void => {
    const sets = this.getSetsData();
    sets[setId] = setData;
    this.replaceSetsData(sets);
  }

  // delete a set
  deleteSet = (setId: string) => {
    const sets = this.getSetsData();
    delete sets[setId];
    // if deleted set is set as current set, default to sample set
    if (this.getCurrentSetId() === setId) this.updateCurrentSet('');
    this.replaceSetsData(sets);
  }

  // checks if a set at given setId exists in localStorage
  hasSet = (setId: string): boolean => {
    const sets = this.getSetsData();
    return sets[setId] ? true : false;
  }

}

export default new HandleLocalStorage;
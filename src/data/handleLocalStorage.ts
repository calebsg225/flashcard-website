// functions for handling localStorage interactions

import { SetData } from "../types/setDataTypes";
import { sampleSets } from "./sample_sets";

class HandleSetsData {
  localStorageSetsKey: string; // key used to store set data in localStorage
  constructor() {
    this.localStorageSetsKey = 'flashcard_website_set_data';
  }

  // gets and returns complete sets data from localStorage
  getSetsData = (): {[key: string]: SetData} => {
    const sets = localStorage.getItem(this.localStorageSetsKey);
    return sets ? JSON.parse(sets) : {};
  }

  // replaces sets data in localStorage with new data
  private replaceSetsData = (data: {[key: string]: SetData}): void => {
    localStorage.setItem(this.localStorageSetsKey, JSON.stringify(data));
  }

  // retrieve a specific set
  retrieveSet = (setKey: string): SetData => {
    const sets = this.getSetsData();
    const retrievedSet: SetData = sets[setKey];
    return retrievedSet;
  }

  // update existing set data with a new set
  updateSet = (setKey: string, setData: SetData): void => {
    const sets = this.getSetsData();
    sets[setKey] = setData;
    this.replaceSetsData(sets);
  }

  // delete a set
  deleteSet = (setKey: string) => {
    const sets = this.getSetsData();
    delete sets[setKey];
    this.replaceSetsData(sets);
  }
}

class HandleCurrentSet {
  localStorageCurrentSetKey: string; // key used to store current set in localStorage
  constructor() {
    this.localStorageCurrentSetKey = 'flashcard_website_current_set';
  }
  /*
  Current Set Behavior:
  - if there is no current set, [use sample data].
  - if current set is a set from sets data and that set is deleted, switch to sample data.
  */

  // set current set to sample data
  private setSampleCurrentSet = (): SetData => {
    const sampleSet: SetData = sampleSets['sample'];
    localStorage.setItem(this.localStorageCurrentSetKey, JSON.stringify(sampleSet));
    return sampleSet;
  }

  // get current set
  // if set does not exist in localstorage, use sample data
  private getCurrentSetData = (): SetData => {
    const set = localStorage.getItem(this.localStorageCurrentSetKey);
    return set ? JSON.parse(set) : this.setSampleCurrentSet();
  }

  // gets the current active set
  retrieveCurrentSet = (): SetData => {
    return this.getCurrentSetData();
  }

  // sets the current active set
  updateCurrentSet = (set: SetData) => {
    localStorage.setItem(this.localStorageCurrentSetKey, JSON.stringify(set));
  }

  // checks to see if there is currently an active set
  hasCurrentSet = (): boolean => {
    const set = this.getCurrentSetData();
    if (set.title && set.cards && set.cards.length) return true;
    return false;
  }
  
}

class HandleLocalStorage {
  handleSetsData: HandleSetsData;
  handleCurrentSet: HandleCurrentSet;
  constructor() {
    this.handleSetsData = new HandleSetsData;
    this.handleCurrentSet = new HandleCurrentSet;
  }
}

export default new HandleLocalStorage;
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

  /**
   * updates current set data stored in localStorage to the default sample set data
   */
  private setSampleCurrentSet = (): void => {
    localStorage.setItem(this.localStorageCurrentSetKey, 'sample');
  }

  /**
   * if the current set id does not exist in localStorage, use sample data
   * @returns current set id
   */
  private getCurrentSetId = (): string => {
    const setId = localStorage.getItem(this.localStorageCurrentSetKey);
    const currentSetId = setId ? setId : 'sample';
    if (!setId) this.setSampleCurrentSet();
    return currentSetId;
  }

  /**
   * @returns current active set data
   */
  retrieveCurrentSetData = (): SetData => {
    const currentSetId = this.getCurrentSetId();
    return currentSetId === 'sample' ? sampleSets[currentSetId] : this.retrieveSet(currentSetId);
  }

  /**
   * sets the current active set id
   * @param setId new id to set as active
   */
  updateCurrentSet = (setId: string) => {
    localStorage.setItem(this.localStorageCurrentSetKey, (setId.length ? setId : 'sample'));
  }

  /**
   * checks to see if there is currently an active set
   * @returns boolean
   */
  hasCurrentSet = (): boolean => {
    return this.getCurrentSetId() !== 'sample';
  }



  /**
   * retrieves all set data from localStorage
   * @returns all set data
   */
  getSetsData = (): Sets => {
    const sets = localStorage.getItem(this.localStorageSetsKey);
    return sets ? JSON.parse(sets) : {};
  }

  /**
   * replaces sets data in localStorage with new data
   * @param data new sets data
   */
  private replaceSetsData = (data: Sets): void => {
    localStorage.setItem(this.localStorageSetsKey, JSON.stringify(data));
  }

  /**
   * retrieves a specfiic set based on the set id
   * @param setId id of set to retrieve
   * @returns set data stored at set id
   */
  retrieveSet = (setId: string): SetData => {
    const sets = this.getSetsData();
    const retrievedSet: SetData = sets[setId];
    return retrievedSet;
  }

  /**
   * update existing set data with a new set
   * @param setId id of the set to update
   * @param setData new data to replace old set data
   */
  updateSet = (setId: string, setData: SetData): void => {
    const sets = this.getSetsData();
    sets[setId] = setData;
    this.replaceSetsData(sets);
  }

  /**
   * deletes specific set based on set id
   * @param setId set id of set to delete
   */
  deleteSet = (setId: string) => {
    const sets = this.getSetsData();
    delete sets[setId];
    // TODO: if deleted set is set as current set, default to sample set
    if (this.getCurrentSetId() === setId) this.updateCurrentSet('');
    this.replaceSetsData(sets);
  }

  /**
   * checks if a set at a given setId exists in localStorage
   * @param setId set id to check
   * @returns boolean
   */
  hasSet = (setId: string): boolean => {
    const sets = this.getSetsData();
    return sets[setId] ? true : false;
  }

}

export default new HandleLocalStorage;
import { firstItem } from '@/constants/Utils';
import { Item } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

// define types for state values and actions separately
type StorageState = {
  pantryList: Item[];
  counterList: Item[];
  refrigeratorList: Item[];
  freezerList: Item[];
  key: string;
  freeText: string;
};

type Actions = {
  reset: () => void;
  setFreeText: (text: string) => void;
  storePantryList: (newList: Item[]) => void;
  storeCounterList: (newList: Item[]) => void;
  storeFreezerList: (newList: Item[]) => void;
  storeRefrigeratorList: (newList: Item[]) => void;
};

// define the initial state
const initialState: StorageState = {
  pantryList: [firstItem],
  counterList: [firstItem],
  refrigeratorList: [firstItem],
  freezerList: [firstItem],
  key: '',
  freeText: '',
};
// create store
export const useStorage = create<StorageState & Actions>()((set, get) => ({
  ...initialState,
  setFreeText: (text: string) => {
    set({ freeText: text });
  },
  storePantryList: async (newList: Item[]) => {
    let newPantryList;
    newPantryList = set({ pantryList: get().pantryList });
    if (newPantryList == undefined) {
      newPantryList = newList;
    } else {
      newPantryList = newPantryList;
    }
    set({ pantryList: newPantryList });
    try {
      const jsonValue = JSON.stringify(newPantryList);
      await AsyncStorage.setItem('pantry-key', jsonValue);
    } catch (e) {
      // saving error
    }
  },
  storeCounterList: async (newList: Item[]) => {
    let newCounterList;
    newCounterList = set({ counterList: get().counterList });
    if (newCounterList == undefined) {
      newCounterList = newList;
    } else {
      newCounterList = newCounterList;
    }
    set({ counterList: newCounterList });
    try {
      const jsonValue = JSON.stringify(newCounterList);
      await AsyncStorage.setItem('counter-key', jsonValue);
    } catch (e) {
      // saving error
    }
  },
  storeFreezerList: async (newList: Item[]) => {
    let newFreezerList;
    newFreezerList = set({ freezerList: get().freezerList });
    if (newFreezerList == undefined) {
      newFreezerList = newList;
    } else {
      newFreezerList = newFreezerList;
    }
    set({ freezerList: newFreezerList });
    try {
      const jsonValue = JSON.stringify(newFreezerList);
      await AsyncStorage.setItem('freezer-key', jsonValue);
    } catch (e) {
      // saving error
    }
  },
  storeRefrigeratorList: async (newList: Item[]) => {
    let newRefrigeratorList;
    newRefrigeratorList = set({ refrigeratorList: get().refrigeratorList });
    if (newRefrigeratorList == undefined) {
      newRefrigeratorList = newList;
    } else {
      newRefrigeratorList = newRefrigeratorList;
    }
    set({ refrigeratorList: newRefrigeratorList });
    try {
      const jsonValue = JSON.stringify(newRefrigeratorList);
      await AsyncStorage.setItem('refrigerator-key', jsonValue);
    } catch (e) {
      // saving error
    }
  },
  reset: () => {
    set(initialState);
  },
}));

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
  storePantryList: (newList: Item[], action: string) => void;
  storeFreezerList: (newList: Item[], action: string) => void;
  storeRefrigeratorList: (newList: Item[], action: string) => void;
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
  storePantryList: async (newList: Item[], action: string) => {
    let newPantryList;
    newPantryList = set({ pantryList: get().pantryList });
    if (newPantryList == undefined) {
      newPantryList = newList;
    } else {
      newPantryList = newPantryList;
    }
    set({ pantryList: newPantryList });
    try {
      const jsonValue = JSON.stringify(
        action === 'delete' ? newList : newPantryList
      );
      await AsyncStorage.setItem('pantry-key', jsonValue);
    } catch (e) {
      // saving error
    }
  },
  storeFreezerList: async (newList: Item[], action: string) => {
    let newFreezerList;
    newFreezerList = set({ freezerList: get().freezerList });
    if (newFreezerList == undefined) {
      newFreezerList = newList;
    } else {
      newFreezerList = newFreezerList;
    }
    set({ freezerList: newFreezerList });
    try {
      const jsonValue = JSON.stringify(
        action === 'delete' ? newList : newFreezerList
      );
      await AsyncStorage.setItem('freezer-key', jsonValue);
    } catch (e) {
      // saving error
    }
  },
  storeRefrigeratorList: async (newList: Item[], action: string) => {
    let newRefrigeratorList;
    newRefrigeratorList = set({ refrigeratorList: get().refrigeratorList });
    if (newRefrigeratorList == undefined) {
      newRefrigeratorList = newList;
    } else {
      newRefrigeratorList = newRefrigeratorList;
    }
    set({ refrigeratorList: newRefrigeratorList });
    try {
      const jsonValue = JSON.stringify(
        action === 'delete' ? newList : newRefrigeratorList
      );
      await AsyncStorage.setItem('refrigerator-key', jsonValue);
    } catch (e) {
      // saving error
    }
  },
  reset: () => {
    set(initialState);
  },
}));

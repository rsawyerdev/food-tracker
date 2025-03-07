import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async () => {
  try {
    const jsonValue = JSON.stringify(freezerList);
    await AsyncStorage.setItem('freezer-key', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('freezer-key');
    return jsonValue;
  } catch (e) {
    // error reading value
  }
};

export const clearStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};

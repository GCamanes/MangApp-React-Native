import AsyncStorage from '@react-native-community/async-storage';

const NAMESPACE = '@MangApp';

const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`${NAMESPACE}:${key}`);

    return JSON.parse(value);
  } catch (e) {
    throw new Error('ERROR_GETTING_STORAGE_DATA');
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(`${NAMESPACE}:${key}`);
  } catch (e) {
    throw new Error('ERROR_REMOVING_STORAGE_DATA');
  }
};

const setItem = async (key, dataToStore) => {
  try {
    return await AsyncStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(dataToStore));
  } catch (error) {
    throw new Error('ERROR_SETTING_STORAGE_DATA');
  }
};

export {
  getItem,
  removeItem,
  setItem,
};

import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  get: async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  },

  getAllKeys: () => AsyncStorage.getAllKeys(),

  set: (key, value) => AsyncStorage.setItem(key, JSON.stringify(value)),

  remove: (key) => AsyncStorage.removeItem(key),

  clear: () => AsyncStorage.clear(),

  clearWithout: async (args = []) => {
    const allKeys = await AsyncStorage.getAllKeys();
    for (const key of allKeys) {
      if (!args.includes(key)) {
        await AsyncStorage.removeItem(key);
      }
    }
  },
};

import AsyncStorage from "@react-native-async-storage/async-storage";

class ClientStorage {
  set(key, item) {
    // keys: string, item: any
    (async () => {
      try {
        await AsyncStorage.setItem(key, item);
      } catch (error) {
        console.error(error);
      }
    })();
  }
  async get(key) {
    // keys: string
    try {
      return AsyncStorage.getItem(key);
    } catch (error) {
      console.error(error);
    }
  }
  async remove(key) {
    // keys: string[]
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }
  multiSet(items) {
    // items: Array<Array<string>>
    (async () => {
      try {
        await AsyncStorage.multiSet(items);
      } catch (error) {
        console.error(error);
      }
    })();
  }
  async multiRemove(keys) {
    // keys: Array<string>
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error(error);
    }
  }
}

const clientStorage = new ClientStorage();

export default clientStorage;

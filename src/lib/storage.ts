const ArrayStorage = {
  setItems<T>(key: string, items: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
      throw new Error(`Error storing array data! : ${error}`);
    }
  },

  // 로컬 스토리지에서 배열 데이터를 가져오는 메서드
  getItems<T>(key: string): T[] {
    let storedArray: T[] = [];
    const existingData = localStorage.getItem(key);

    if (existingData) {
      try {
        storedArray = JSON.parse(existingData) as T[];
        return storedArray;
      } catch (error) {
        throw new Error(`Error parsing existing data! : ${error}`);
      }
    }

    return [];
  },

  pushItems<T>(key: string, value: T): void {
    let storedArray: T[] = [];
    const existingData = localStorage.getItem(key);

    if (existingData) {
      try {
        storedArray = JSON.parse(existingData) as T[];
      } catch (error) {
        throw new Error(`Error parsing existing data! : ${error}`);
      }
    }

    storedArray.push(value);
    try {
      localStorage.setItem(key, JSON.stringify(storedArray));
    } catch (error) {
      throw new Error(`Error storing array data! : ${error}`);
    }
  },
  clearItems(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      throw new Error(`Error clearing array data! : ${error}`);
    }
  },
};

export default ArrayStorage;

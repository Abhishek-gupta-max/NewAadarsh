const STORAGE_PREFIX = 'newaadarsh_';

export const storage = {
  get: (key) => {
    try {
      const serializedValue = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      if (serializedValue === null) return null;
      return JSON.parse(serializedValue);
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, serializedValue);
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  },
  
  clear: () => {
    try {
      // Clear only keys with our prefix
      Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }
};

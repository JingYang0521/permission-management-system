export const rmLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};

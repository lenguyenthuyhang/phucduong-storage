function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    console.error(e.message);
    return false;
  }
  return true;
}

export const localStorageHealthCheck = async () => {
  for (var i = 0; i < localStorage.length; ++i) {
    try {
      const result = window.localStorage.getItem(localStorage.key(i) as string) as string;
      if (!isJsonString(result)) {
        window.localStorage.removeItem(localStorage.key(i) as string);
      }
      if (result && Object.keys(localStorage.key(i) as string).length == 0) {
        window.localStorage.removeItem(localStorage.key(i) as string);
      }
    } catch (error) {
      window.localStorage.clear();
      // Handle the exception here
      console.error('window.localStorage Exception occurred:', error);
      // You can choose to ignore certain exceptions or take other appropriate actions
    }
  }
};

export const storePersist = {
  set: (key: string, state: any) => {
    window.localStorage.setItem(key, JSON.stringify(state));
  },
  get: (key: string) => {
    const result = window.localStorage.getItem(key);
    if (!result) {
      return false;
    } else {
      if (!isJsonString(result)) {
        window.localStorage.removeItem(key);
        return false;
      } else return JSON.parse(result);
    }
  },
  remove: (key: string) => {
    window.localStorage.removeItem(key);
  },
  getAll: () => {
    return window.localStorage;
  },
  clear: () => {
    window.localStorage.clear();
  },
};

export default storePersist;

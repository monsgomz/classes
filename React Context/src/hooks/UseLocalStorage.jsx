import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialState) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key); 
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => { 
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

import { Store } from 'pinia';

// Deep clone function to handle objects and arrays
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle array cloning with improved type assertion
  if (Array.isArray(obj)) {
    const arr = obj.map((item) => deepClone(item)) as unknown as T;
    return arr;
  }

  // Handle object cloning with proper typing
  if (typeof obj === 'object' && obj !== null) {
    const cloneObj = Object.keys(obj).reduce((acc, key) => {
      // Here we need to assert the type of key and obj[key]
      acc[key as keyof typeof acc] = deepClone((obj as any)[key]);
      return acc;
    }, {} as T);
    return cloneObj;
  }

  return obj;
}

// Reset store function
export default function resetStore({ store }: { store: Store }) {
  // Create a deep clone of the initial state
  const initialState = deepClone(store.$state);

  // Define the $reset method to deep clone the initialState and apply it
  store.$reset = () => {
    const newState = deepClone(initialState);
    store.$patch(newState);
  };
}

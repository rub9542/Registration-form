import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose the storage engine (e.g., localStorage)

// Import your root reducer
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root", // Key for the persist storage
  storage, // Storage engine (e.g., localStorage)
  // Optionally, you can whitelist or blacklist specific reducers
  // whitelist: ['auth'], // Only 'auth' reducer will be persisted
  // blacklist: ['cart'], // 'cart' reducer will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export  const persistor = persistStore(store);

import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import authSlice from "./slice/authSlice";
// import cateSlice from "./slice/categoriesSlice";
// import taskSlice from "./slice/taskSlice";
// import filterSlice from "./slice/searchSlice";
import predictImgSlice from "./slice/predictImgSlice";
import tableClientSlice from "./slice/tableClientSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["auth"],
};

const reducer = combineReducers({
  auth: authSlice.reducer,
  // categories: cateSlice.reducer,
  // taskSlice: taskSlice.reducer,
  // filterSlice: filterSlice.reducer,
  predictImgSlice: predictImgSlice.reducer,
  tableClientSlice: tableClientSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persist = persistStore(store);

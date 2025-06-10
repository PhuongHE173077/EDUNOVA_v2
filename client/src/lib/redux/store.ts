import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "@/lib/redux/user/user.slide";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import chatSlide from "./chat/chat.slide";
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
  blacklist: [],
};
const rootReducer = combineReducers({
  user: authReducer,
  chat: chatSlide
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

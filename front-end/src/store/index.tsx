import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authApi, { authReducer } from "../services/auth";
import statusApi, { statusReducer } from "../services/status";
import servicesApi, { servicesReducer } from "../services/services";
import userApi, { userReducer } from "../services/user";
import roleApi, { roleReducer } from "../services/role";
import setTimeApi, { setTimeReducer } from "../services/setTime";
import staffApi, { staffReducer } from "../services/staff";
import pethouseApi, { pethouseReducer } from "../services/pethouse";
import speciesApi, { speciesReducer } from "../services/species";
import breedApi, { breedReducer } from "../services/breed";
import contactApi, { contactReducer } from "../services/contact";
import profileApi, { profileReducer } from "../services/profile";
import newsApi, { newsReducer } from "../services/news";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cat"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authReducer,
  [statusApi.reducerPath]: statusReducer,
  [servicesApi.reducerPath]: servicesReducer,
  [userApi.reducerPath]: userReducer,
  [roleApi.reducerPath]: roleReducer,
  [setTimeApi.reducerPath]: setTimeReducer,
  [staffApi.reducerPath]: staffReducer,
  [pethouseApi.reducerPath]: pethouseReducer,
  [speciesApi.reducerPath]: speciesReducer,
  [breedApi.reducerPath]: breedReducer,
  [contactApi.reducerPath]: contactReducer,
  [profileApi.reducerPath]: profileReducer,
  [newsApi.reducerPath]: newsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      statusApi.middleware,
      userApi.middleware,
      roleApi.middleware,
      servicesApi.middleware,
      userApi.middleware,
      setTimeApi.middleware,
      staffApi.middleware,
      pethouseApi.middleware,
      speciesApi.middleware,
      breedApi.middleware,
      contactApi.middleware,
      profileApi.middleware,
      newsApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default persistStore(store);

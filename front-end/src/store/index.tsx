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
import statusApi, { statusReducer } from "../services/status_appointment";
import servicesApi, { servicesReducer } from "../services/services";
import userApi, { userReducer } from "../services/user";
import roleApi, { roleReducer } from "../services/role";
import setTimeApi, { setTimeReducer } from "../services/setTime";
import staffApi, { staffReducer } from "../services/staff";
import pethouseApi, { pethouseReducer } from "../services/pethouse";
import speciesApi, { speciesReducer } from "../services/species";
import appointmentApi, { appointmentReducer } from "../services/appointments";
import breedApi, { breedReducer } from "../services/breed";
import contactApi, { contactReducer } from "../services/contact";
import profileApi, { profileReducer } from "../services/profile";
import newsApi, { newsReducer } from "../services/news";
import reviewApi, { reviewReducer } from "../services/review";
import petsApi, { petsReducer } from "../services/pets";
import categoryApi, { categoryReducer } from "../services/category";
import statusContactApi, {
  statusContactReducer,
} from "../services/status_contact";
import aboutApi, { aboutReducer } from "../services/about";
import ProductsApi, { productsReducer } from "../services/products";
import cartsApi, { cartsReducer } from "../services/shoppingCart";

import statusPetApi, { statusPetReducer } from "../services/status_pet";
import BannerApi, { bannerReducer } from "../services/banner";
import statusOrderApi, { statusOrderReducer } from "../services/status_order";
import dashboardApi, { dashboardReducer } from "../services/dashboard";
import invoiceApi, { invoiceReducer } from "../services/invoice";
import menuTypeApi, { menuTypeReducer } from "../services/menuType";
import menuApi, { menuReducer } from "../services/menu";
import LogoApi, { logoReducer } from "../services/logo";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
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
  [appointmentApi.reducerPath]: appointmentReducer,
  [breedApi.reducerPath]: breedReducer,
  [contactApi.reducerPath]: contactReducer,
  [profileApi.reducerPath]: profileReducer,
  [newsApi.reducerPath]: newsReducer,
  [reviewApi.reducerPath]: reviewReducer,
  [petsApi.reducerPath]: petsReducer,
  [statusContactApi.reducerPath]: statusContactReducer,
  [aboutApi.reducerPath]: aboutReducer,
  [categoryApi.reducerPath]: categoryReducer,
  [ProductsApi.reducerPath]: productsReducer,
  [cartsApi.reducerPath]: cartsReducer,
  [statusPetApi.reducerPath]: statusPetReducer,
  [BannerApi.reducerPath]: bannerReducer,
  [statusOrderApi.reducerPath]: statusOrderReducer,
  [dashboardApi.reducerPath]: dashboardReducer,
  [invoiceApi.reducerPath]: invoiceReducer,
  [menuTypeApi.reducerPath]: menuTypeReducer,
  [menuApi.reducerPath]: menuReducer,
  [LogoApi.reducerPath]: logoReducer,
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
      appointmentApi.middleware,
      breedApi.middleware,
      contactApi.middleware,
      profileApi.middleware,
      newsApi.middleware,
      reviewApi.middleware,
      petsApi.middleware,
      statusContactApi.middleware,
      aboutApi.middleware,
      categoryApi.middleware,
      ProductsApi.middleware,
      cartsApi.middleware,
      statusPetApi.middleware,
      BannerApi.middleware,
      statusOrderApi.middleware,
      dashboardApi.middleware,
      invoiceApi.middleware,
      menuTypeApi.middleware,
      menuApi.middleware,
      LogoApi.middleware
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

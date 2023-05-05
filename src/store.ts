import {combineReducers, configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./app/categories/store/categories.slice";
import productsReducer from "./app/products/store/products.slice";
import roleReducer from "./app/roles/store/roles.slice";
import authReducer from "./app/auth/store/auth.slice";
import userReducer from "./app/users/store/users.slice";
import personalInfo from './app/admin-personal-info/store/personal-info.slice';
import userSettingsReducer from './app/settings/store/settings.slice';

const rootReducer = combineReducers({
    categoryReducer,
    productsReducer,
    roleReducer,
    authReducer,
    userReducer,
    personalInfo,
    userSettingsReducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}
export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

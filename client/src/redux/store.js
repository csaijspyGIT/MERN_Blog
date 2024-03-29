import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice.js";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import themeSlice from "./theme/theme.slice.js";
import tabSlice from "./dashboard/tab.slice.js";
import postSlice from "./user/post.slice.js";

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeSlice,
    tab: tabSlice,
    post: postSlice,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefualtMiddleware) => getDefualtMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);

export default store;
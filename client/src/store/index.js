// import { applyMiddleware, createStore } from "redux"
// import thunk from "redux-thunk"
// import reducers from "./reducers"
// import storage from 'redux-persist/lib/storage';
// import { persistStore, persistReducer } from 'redux-persist';

// const persistConfig = {
//     key: 'root',
//     storage,
//     // whitelist: ['user'],
// };
// const persistedReducer = persistReducer(persistConfig, reducers);
// const store = createStore(
//     persistedReducer,
//     applyMiddleware(thunk)
// );
// const persistor = persistStore(store);
// export { store, persistor }

import { configureStore } from '@reduxjs/toolkit'
import { emptySplitApi } from './slice/emptySplitApi'
import { combineReducers } from "redux"
import mainReducer from './slice/mainSlice'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['user'],
};
const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({
    reducer : {
        reducer: persistedReducer,
        [emptySplitApi.reducerPath]: emptySplitApi.reducer
    },
    middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
        
    })
    .concat(emptySplitApi.middleware),
})

export const persistor = persistStore(store)
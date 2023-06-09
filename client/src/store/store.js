// import { configureStore } from '@reduxjs/toolkit'
// import { emptySplitApi } from './slice/emptySplitApi'
// import mainReducer from './slice/mainSlice'
// import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'

// export const store = configureStore({
    
//     reducer : {
//         user: mainReducer,
//         [emptySplitApi.reducerPath]: emptySplitApi.reducer
//     },
//     middleware : (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//         serializableCheck: {
//             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//         },
        
//     })
//     .concat(emptySplitApi.middleware),
// })

// export const persistor = persistStore(store)
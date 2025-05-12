import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../features/loadingSlice";
import { pageReducer } from "../features/pageSlice";
import { dataReducer } from "../features/dataSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        page: pageReducer,
        data: dataReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
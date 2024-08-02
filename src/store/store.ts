import { configureStore } from "@reduxjs/toolkit";
import colorsReducer from "./colorsAndFonts/reducerColorsAndFonts";

const store = configureStore({
    reducer: {
        colors: colorsReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
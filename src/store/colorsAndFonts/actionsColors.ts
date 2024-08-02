import { createAction } from "@reduxjs/toolkit";
import { initialState } from "./reducerColorsAndFonts";

export const changeColor = createAction('@@colors/CHANGE_COLOR', (typeOfColor: keyof typeof initialState.colors, color: string) => ({
    payload: {
        typeOfColor, color
    }
}))
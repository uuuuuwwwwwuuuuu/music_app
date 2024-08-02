import { createReducer } from "@reduxjs/toolkit";
import { changeColor } from "./actionsColors";

export const initialState = {
    colors: {
        bgMainColor: "#0D0C0D",
        bgSecondColor: '#1B1A1C',
        bgInputColor: '#2B2A2D',
        bgDisableColor: '#232224',
        contentMain: '#E0DCEA',
        contentDisable: '#919095',
        contentAdditional: '#C5C4C6',
        accent: '#5E37CC',
        accentHovered: '#4927A8',
        error: '#C84141',
        success: '#4EBA3C'
    },
    fonts: {
        inria: 'inria',
        rubicL: 'rubic-l',
        rubicR: 'rubic-r',
        rubicM: 'rubic-m',
        rubicS: 'rubic-s',
        rubicB: 'rubic-b',
    }
}

const colorsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeColor, (state, {payload}) => {
            state.colors[payload.typeOfColor] = payload.color
        })
})

export default colorsReducer
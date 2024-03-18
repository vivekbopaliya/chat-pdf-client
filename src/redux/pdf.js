import { createSlice } from "@reduxjs/toolkit";

export const PDF = createSlice({
    name: "PDF",
    initialState: {
        currentPDF: null,
    },
    reducers: {
        setCurrentPDF(state, action) {
            state.currentPDF = action.payload;
        },
    },
});

export const { setCurrentPDF } = PDF.actions;

export default PDF.reducer;

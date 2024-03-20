import { createSlice } from "@reduxjs/toolkit";

export const PDF = createSlice({
    name: "PDF",
    initialState: {
        // to keep the track of current uplaoded pdf
        currentPDF: null,

        // to refetch data from database 
        isUploaded: false
    },
    reducers: {
        setCurrentPDF(state, action) {
            state.currentPDF = action.payload;
        },
        setIsUploaded(state, action) {
            state.isUploaded = action.payload
        }
    },
});

export const { setCurrentPDF, setIsUploaded } = PDF.actions;

export default PDF.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const chat = createSlice({
    name: "chat",
    initialState: {

        // To keep track of the conversation
        chatHistory: [],
    },
    reducers: {

        setChatHistory(state, action) {
            // Add the new question and answer object into chatHistory array
            state.chatHistory.push({
                question: action.payload.question,
                answer: action.payload.answer
            });
        }
    },
});

export const { setQuestion, setChatHistory } = chat.actions;

export default chat.reducer;

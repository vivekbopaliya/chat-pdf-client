import { createSlice } from "@reduxjs/toolkit";

export const chat = createSlice({
    name: "chat",
    initialState: {
        chatHistory: {
            'chat_history': '',
            'question': '',
            'answer': ''

        },
    },
    reducers: {
        setChatHistory(state, action) {
            state.chatHistory.chat_history = action.payload.chat_history
            state.chatHistory.question = action.payload.question
            state.chatHistory.answer = action.payload.answer

        }
    },
});

export const { setChatHistory } = chat.actions;

export default chat.reducer;

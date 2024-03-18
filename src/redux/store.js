import { configureStore } from "@reduxjs/toolkit";
import PDFReducer from './pdf'
import ChatReducer from './chat'

export default configureStore({
    reducer: {
        PDF: PDFReducer,
        chat: ChatReducer
    },
});

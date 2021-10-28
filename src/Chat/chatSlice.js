import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isAuthenticated: false,
    myUid: "",
    messages: {},
    chats: {},
  },
  reducers: {
    addMessage: (state, action) => {
      const { chatId, messageText, authorId } = action.payload;
      state.messages = {
        ...state.messages,
        [chatId]: [
          ...state.messages[chatId],
          {
            timeStamp: moment().valueOf(),
            authorId,
            text: messageText,
          },
        ],
      };
    },

    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.messages = {
        ...state.messages,
        [chatId]: messages,
      };
    },

    changeIsAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    setChat: (state, action) => {
      // const { targetUid, chatId } = action.payload;
      state.chats = {
        ...state.chats,
        ...action.payload,
      };
    },

    setMyUid: (state, action) => {
      state.myUid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, changeIsAuth, setMessages, setMyUid, setChat } =
  chatSlice.actions;

export default chatSlice.reducer;

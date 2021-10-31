import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { sendMessageWithThunk, initMessageTracking } from "./actions";

const useStyles = makeStyles((theme) => ({
  chatWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F0F",
  },

  componentWrapper: {
    width: "600px",
    height: "800px",
    display: "flex",
    flexDirection: "column",
  },
}));

function ChatContainer() {
  const urlParams = useParams();
  const targetUId = urlParams.id;
  const chats = useSelector((state) => state.chat.chats);
  const targetProfileId = targetUId;
  const chatId = chats[targetProfileId] ? chats[targetProfileId].chatId : null;

  const messages = useSelector((state) => state.chat.messages[chatId]);

  const myUid = useSelector((state) => state.chat.myUid);
  const dispatch = useDispatch();

  const classes = useStyles();

  const onSendMessage = (messageText) => {
    dispatch(
      sendMessageWithThunk({
        chatId,
        messageText,
        authorUid: myUid,
        targetUid: targetUId,
      })
    );
  };

  useEffect(() => {
    if (document.getElementsByClassName("messageList")[0]) {
      document.getElementsByClassName("messageList")[0].scrollTop = 999999;
    }
  });

  if (!targetProfileId || !chatId) {
    return <div>Ошибка, нет собеседника</div>;
  }

  return <Chat  classes={classes} messages={messages} onSendMessage={onSendMessage} />;
}

export default ChatContainer;

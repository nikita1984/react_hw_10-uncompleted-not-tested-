import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
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

function Chat() {
  const urlParams = useParams();
  const targetUId = urlParams.id;
  const chats = useSelector((state) => state.chat.chats);
  // console.log(chats);
  
  // const targetProfileId = Object.keys(chats).find((profileId) => profileId);
  const targetProfileId = targetUId;

  // const targetProfileIdUpd = targetUId;
  console.log(targetProfileId, "targetProfileId");
  // console.log(targetProfileIdUpd, "targetProfileIdUpd");

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

  return (
    <div className={classes.chatWrapper}>
      <div className={classes.componentWrapper}>
        <MessageList messagesArray={messages} />
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}

export default Chat;

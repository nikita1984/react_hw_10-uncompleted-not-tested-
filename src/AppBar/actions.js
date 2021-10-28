import { setChat } from "../Chat/chatSlice";
import { db } from "../App";

const getPayloadFromSnapshot = (snapshot) => {
  //   const messages = [];

  //   const chats = [];

  //   snapshot.forEach((mes) => {
  //     messages.push(mes.val());
  //   });

  // console.log(snapshot.val(), "VAL");

  return { [snapshot.key]: snapshot.val() };
};

export const addChatToThunk = (message) => async (dispatch, getState) => {
  const { chat } = getState();
  const chatId = message.chatId;
  const messages = chat.messages[chatId] || [];

  //   dispatch(
  //     addMessageWithFirebase(chatId, {
  //       ...message,
  //       id: `${chatId}-${messages?.length || 0}-${Date.now()}`,
  //     })
  //   );
};

const generateChatId = (uidA, uidB) => {
  if (uidA > uidB) {
    return `${uidA}-${uidB}`;
  }
  return `${uidB}-${uidA}`;
};

export const addChatToFirebase = async (myUid, targetUid) => {
  const profile = db.ref("profiles").child(targetUid).get();
  console.log("PROFILE", profile);
  if (profile) {
    await db
      .ref("chats")
      .child(myUid)
      .child(targetUid)
      .set({ chatId: generateChatId(myUid, targetUid) });
  }
};

export const initChatsTracking = (myUid) => (dispatch) => {
  db.ref("chats")
    .child(myUid)
    .on("child_changed", (snapshot) => {
      const payload = getPayloadFromSnapshot(snapshot);
    //   console.log(payload, "Payload1");
      dispatch(setChat(payload));
    });

  db.ref("chats")
    .child(myUid)
    .on("child_added", (snapshot) => {
      const payload = getPayloadFromSnapshot(snapshot);
    //   console.log(payload, "Payload2");
      dispatch(setChat(payload));
    });
};

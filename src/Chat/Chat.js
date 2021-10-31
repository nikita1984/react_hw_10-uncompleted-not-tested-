import PropTypes from "prop-types";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function Chat(props) {
  return (
    <div className={props.classes.chatWrapper}>
      <div className={props.classes.componentWrapper}>
        <MessageList messagesArray={props.messages} />
        <MessageInput onSendMessage={props.onSendMessage} />
      </div>
    </div>
  );
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Chat;

import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { createUseStyles } from "react-jss";
import { colors } from "../variables/color.variables";

const useStyles = createUseStyles({
  inputContainer: {
    display: "flex",
    gap: "1vw",
    marginBottom: "1vw",
  },
  inputStyles: {
    width: "60vw",
    height: "5vh",
    borderRadius: "10px",
    backgroundColor: colors.chatScreenBG,
    color: "white",
    border: "none",
    paddingLeft: "1rem",
    fontSize: "1.2rem",
    "&::selection": {
      backgroundColor: "#9a86f3",
    },
    "&:focus": {
      outline: "none",
    },
  },
  inputBtn: {
    width: "2.5vw",
    borderRadius: "50%",
    height: "auto",
    backgroundColor: colors.chatScreenBG,
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  "@media only screen and (max-device-width: 480px)": {
    inputStyles: {
      width: "70vw",
    },
    inputBtn: {
      width: "3vw",
    },
  },
});
const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const classes = useStyles();

  const sendChat = () => {
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className={classes.inputContainer}>
      <input
        className={classes.inputStyles}
        type="text"
        placeholder="type your message here"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <button className={classes.inputBtn} onClick={() => sendChat()}>
        <IoMdSend />
      </button>
    </div>
  );
};

export default ChatInput;

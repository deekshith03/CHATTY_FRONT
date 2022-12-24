import React, { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";
import { ChatState } from "../context/ChatProvider";
import { colors } from "../variables/color.variables";
import { Contacts } from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { axiosInstance } from "../axios";
import io from "socket.io-client";
const Base_uri = import.meta.env.VITE_BASE_URL;

const useStyles = createUseStyles({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: colors.chatScreenBG,
  },
  window: {
    height: "85vh",
    width: "85vw",
    backgroundColor: colors.chatWindowBG,
    display: "flex",
  },
});

function ChatScreen() {
  const classes = useStyles();
  const socket = useRef();
  const { user, selectedContact, setSelectedContactMessages, setUsersActive } =
    ChatState();

  useEffect(() => {
    if (selectedContact) {
      axiosInstance
        .post("/api/message/getmessages", {
          data: {
            from: user.id,
            to: selectedContact._id,
          },
        })
        .then((res) => {
          setSelectedContactMessages(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedContact]);

  useEffect(() => {
    if (user) {
      socket.current = io(Base_uri);
      socket.current.emit("setup", user);
      socket.current.on("online", (msg) => {
        setUsersActive(msg);
      });
      socket.current.on("offline", (msg) => {
        setUsersActive(msg);
      });
      return () => {
        socket.current.off("receive_message");
        socket.current.off("online");
        socket.current.off("offline");
      };
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.window}>
        <div>
          <Contacts socket={socket} />
        </div>
        {!selectedContact ? <Welcome /> : <ChatContainer socket={socket} />}
      </div>
    </div>
  );
}

export default ChatScreen;

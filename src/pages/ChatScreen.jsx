import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { ChatState } from "../context/ChatProvider";
import { colors } from "../variables/color.variables";
import { Contacts } from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { axiosInstance } from "../axios";
import io from "socket.io-client";
import { useWindowWidth } from "@react-hook/window-size";
import { useNavigate } from "react-router-dom";
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

  loaderContainer: {
    width: "100%",
    height: "100vh",
    position: "fixed",
    background: "rgba(0, 0, 0, 0.834) center no-repeat",
    backgroundImage: `url(
      "https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif"
    )`,
    zIndex: 1,
  },

  contactsClose: {
    display: "none",
  },
  contactsOpen: {
    display: "block",
  },
});

function ChatScreen() {
  const classes = useStyles();
  const socket = useRef();
  const {
    user,
    selectedContact,
    setSelectedContactMessages,
    setUsersActive,
    setSelectedContact,
  } = ChatState();
  const [loading, setLoading] = useState(false);
  const [dynamicClass, setDynamicStyles] = useState("contactsOpen");
  const onlyWidth = useWindowWidth();
  const navigate = useNavigate();
  const handleBack = () => {
    setSelectedContact(null);
    setDynamicStyles("contactsOpen");
  };

  useEffect(() => {
    if (selectedContact) {
      if (onlyWidth < 480) {
        setDynamicStyles("contactsClose");
      }

      setLoading(true);
      axiosInstance
        .post("/api/message/getmessages", {
          data: {
            from: user.id,
            to: selectedContact._id,
          },
        })
        .then((res) => {
          setSelectedContactMessages(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
    else
    {
      navigate("/");
    }
  }, []);

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.loaderContainer} />
      ) : (
        <div className={classes.window}>
          <div className={classes[dynamicClass]}>
            <Contacts socket={socket} />
          </div>
          {!selectedContact ? (
            <Welcome />
          ) : (
            <ChatContainer socket={socket} handleBack={() => handleBack()} />
          )}
        </div>
      )}
    </div>
  );
}

export default ChatScreen;

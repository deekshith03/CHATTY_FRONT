import React, { useRef, useEffect } from "react";
import { axiosInstance } from "../axios";
import { ChatState } from "../context/ChatProvider";
import ChatInput from "./ChatInput";
import { createUseStyles } from "react-jss";
import { colors } from "../variables/color.variables";
import { useWindowWidth } from "@react-hook/window-size";
import { BiLeftArrowCircle } from "react-icons/bi";

const useStyles = createUseStyles({
  chatContainer: {
    marginLeft: "1.5vw",
    width: "62vw",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    height: "72vh",
    marginTop: "6vh",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    marginTop: "1.2vh",
  },

  userDetails: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  avatar: {
    height: "3rem",
  },

  chatMessages: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflow: "auto",
    marginBottom: "2vh",
    "&::-webkit-scrollbar": {
      width: "0.2rem",
      "&-thumb": {
        backgroundColor: "#ffffff39",
        width: "0.1rem",
        borderRadius: "1rem",
      },
    },
  },

  messageSended: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "0 1.2vw",
  },

  messageReceived: {
    display: "flex",
    justifyContent: "flex-start",
  },

  contentSended: {
    maxWidth: "30vw",
    overflowWrap: "break-word",
    padding: "0 2rem",
    fontSize: "1.3rem",
    borderRadius: "1rem",
    color: colors.messageColor,
    backgroundColor: "#4f04ff21",
  },

  contentReceived: {
    maxWidth: "30vw",
    overflowWrap: "break-word",
    padding: "0 2rem",
    fontSize: "1.3rem",
    borderRadius: "1rem",
    color: colors.messageColor,
    backgroundColor: "#9900ff20",
  },
  backBtn: {
    marginRight: "2vw",
    cursor: "pointer",
    width: "8vw",
    height: "auto",
  },

  "@media only screen and (max-device-width: 480px)": {
    chatContainer: {
      width: "100vw",
      height: "70vh",
    },
  },
});
const ChatContainer = ({ socket, handleBack }) => {
  const classes = useStyles();
  const {
    user,
    selectedContact,
    selectedContactMessages,
    setSelectedContactMessages,
  } = ChatState();
  const scrollRef = useRef();
  const onlyWidth = useWindowWidth();

  const handleSendMsg = async (msg) => {
    await socket.current.emit("send_message", {
      senderID: user.id,
      receiverID: selectedContact._id,
      content: msg,
    });

    axiosInstance
      .post("/api/message/addmessage", {
        data: {
          from: user.id,
          to: selectedContact._id,
          message: msg,
        },
      })
      .then((res) => {
        if (res.data) {
          setSelectedContactMessages((prev) => [
            ...prev,
            {
              from: user.id,
              to: selectedContact._id,
              message: msg,
              fromSelf: true,
            },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive_message", (msg) => {
        console.log(msg);

        if (msg.senderID === selectedContact._id || msg.senderID === user.id) {
          setSelectedContactMessages((prev) => [
            ...prev,
            {
              from: msg.senderID,
              to: msg.receiverID,
              message: msg.content,
              fromSelf: msg.fromSelf,
            },
          ]);
        }
      });
    }

    return () => {
      socket.current.off("receive_message");
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedContactMessages]);

  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatHeader}>
        <div className={classes.userDetails}>
          <div>
            <img
              className={classes.avatar}
              src={selectedContact.avatarImage}
              alt=""
            />
          </div>
          <div>
            <h3 className={classes.username}>{selectedContact.name}</h3>
          </div>
        </div>
        {onlyWidth < 480 && (
          <BiLeftArrowCircle
            className={classes.backBtn}
            onClick={() => handleBack()}
          />
        )}
      </div>
      <div className={classes.flexContainer}>
        <ChatInput handleSendMsg={handleSendMsg} />

        {selectedContactMessages && (
          <div className={classes.chatMessages}>
            {selectedContactMessages.map((message, ind) => {
              const messageClass = message.fromSelf
                ? "messageSended"
                : "messageReceived";
              const contentClass = message.fromSelf
                ? "contentSended"
                : "contentReceived";
              return (
                <div ref={scrollRef} key={ind}>
                  <div className={classes[messageClass]}>
                    <div className={classes[contentClass]}>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;

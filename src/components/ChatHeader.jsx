import React from "react";
import { BiLeftArrowCircle } from "react-icons/bi";
import { useWindowWidth } from "@react-hook/window-size";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
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
  backBtn: {
    marginRight: "2vw",
    cursor: "pointer",
    width: "8vw",
    height: "auto",
  },
});
const ChatHeader = ({ selectedContact,handleBack }) => {
  const classes = useStyles();
  const onlyWidth = useWindowWidth();

  return (
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
          <h3>{selectedContact.name}</h3>
        </div>
      </div>
      {onlyWidth < 480 && (
        <BiLeftArrowCircle
          className={classes.backBtn}
          onClick={() => handleBack()}
        />
      )}
    </div>
  );
};

export default ChatHeader;

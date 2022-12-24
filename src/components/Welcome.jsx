import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
import { createUseStyles } from "react-jss";
import { ChatState } from "../context/ChatProvider";

const useStyles = createUseStyles({
  welcomeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    flexDirection: "column",
    width: "100vw",
  },
});
export default function Welcome() {
  const classes = useStyles();
  const { user } = ChatState();

  return (
    <>
      {user && (
        <div className={classes.welcomeContainer}>
          <img src={Robot} alt="" />
          <h1>
            Welcome, <span>{user.name}!</span>
          </h1>
          <h3>Please select a chat to Start messaging.</h3>
        </div>
      )}
    </>
  );
}

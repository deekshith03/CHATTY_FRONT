import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    backgroundColor: "#9a86f3",
    border: "none",
    cursor: "pointer",
  },
});
const Logout = ({ socket }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    socket.current.disconnect()
    navigate("/");
  };

  return (
    <button className={classes.btn} onClick={handleClick}>
      <BiPowerOff />
    </button>
  );
};

export default Logout;

import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Register } from "../components/Register";
import { SignIn } from "../components/SignIn";
import { useNavigate } from "react-router-dom";
import { colors } from "../variables/color.variables";

const useStyles = createUseStyles({
  container: {
    textAlign: "center",
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    color: colors.themeColor,
    backgroundColor: colors.chatScreenBG,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    margin: 0,
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  headingStyles: {
    width: "fit-content",
  },
  paraStyles: {
    width: "17vw",
    textAlign: "left",
  },

  "@media only screen and (max-device-width: 480px)": {
    container: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column-reverse",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      color: colors.themeColor,
      backgroundColor: colors.chatScreenBG,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      gap: "0vw",
      margin: 0,
    },
    paraStyles: {
      width: "90vw",
      textAlign: "left",
    },
    headingStyles: {
      width: "fit-content",
      textAlign: "center",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
});
function AuthScreen() {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(false);
  let navigate = useNavigate();
  const handleNewUser = () => {
    setNewUser((newUser) => !newUser);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, []);

  return (
    <div className={classes.container}>
      {!newUser ? (
        <SignIn handleNewUser={handleNewUser} />
      ) : (
        <Register handleNewUser={handleNewUser} />
      )}
    </div>
  );
}

export default AuthScreen;

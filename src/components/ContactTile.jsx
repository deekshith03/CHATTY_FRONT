import React from "react";
import { createUseStyles } from "react-jss";

const ContactTile = ({ imageUrl, title, subTitle, handleClick, isActive }) => {
  const useStyles = createUseStyles({
    imageStyles: {
      borderRadius: 75,
      borderWidth: 2,
      height: 50,
      width: 50,
      marginTop: "1.5vh",
    },
    subTitleFontStyles: {
      fontFamily: "Roboto",
      fontSize: 15,
      margin: 0,
      marginBottom: "1.5vh",
      marginTop: "1.0vh",
      color: "white",
      textAlign: "left",
    },
    textContainer: {
      marginLeft: 15,
      flexGrow: 1,
    },
    btnStyles: {
      borderStyle: "solid",
      borderColor: "#131324",
      display: "flex",
      flexDirection: "row",
      paddingLeft: "20px",
      width: "100%",
      backgroundColor: "#ffffff34",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: "#9a86f3",
      },
    },
    tileStylesBottom: {
      borderBottomWidth: 0,
    },
    titleFontStyles: {
      fontSize: 20,
      margin: 0,
      marginTop: "1.5vh",
      color: "white",
      textAlign: "left",
      fontWeight: "bold",
    },

    online: {
      alignContent: "center",
      height: "1vh",
      width: "0.5vw",
      backgroundColor: "#7CFC00",
      borderRadius: "50%",
      display: "inline-block",
      marginTop:'0.5vh'
    },
    offline: {
      alignContent: "center",
      height: "1vh",
      width: "0.5vw",
      backgroundColor: "red",
      borderRadius: "50%",
      display: "inline-block",
      marginTop:'0.5vh'

    },
  });

  const classes = useStyles();

  const statusStyles = isActive ? "online" : "offline";

  return (
    <button className={classes.btnStyles} onClick={() => handleClick()}>
      <img className={classes.imageStyles} src={imageUrl} />
      <div className={classes.textContainer}>
        <p className={classes.titleFontStyles}>{title}</p>
        {subTitle.length > 0 ? (
          <p className={classes.subTitleFontStyles}>{subTitle}</p>
        ) : null}
      </div>
      <span className={classes[statusStyles]} />
    </button>
  );
};

export default ContactTile;

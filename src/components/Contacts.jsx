import React, { useEffect } from "react";
import { axiosInstance } from "../axios";
import { ChatState } from "../context/ChatProvider";
import { createUseStyles } from "react-jss";
import ContactTile from "./ContactTile";
import Logout from "./Logout";
import { colors } from "../variables/color.variables";

const useStyles = createUseStyles({
  container: {
    overflowY: "auto",
    backgroundColor: "#080420",
    height: "auto",
    maxHeight: "79.5vh",
  },
  contacts: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    gap: "0.8rem",
    "&::-webkit-scrollbar": {
      width: "0.2rem",
      "&-thumb": {
        backgroundColor: "#ffffff39",
        width: "0.1rem",
        borderRadius: "1rem",
      },
    },
  },

  contact: {
    backgroundColor: colors.tileBG,
    minHeight: "5rem",
    cursor: "pointer",
    width: "90%",
    borderRadius: "0.2rem",
    padding: "0.4rem",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    transition: "0.5s ease-in-out",
  },
  heading: {
    textAlign: "center",
    textTransform: "capitalize",
    color: "white",
    margin: 0,
  },

  toplevel: {
    width: "20vw",
  },

  brandContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "1.5vw",
    justifyContent: "space-between",
  },
});
export const Contacts = ({ socket }) => {
  const { user, setContacts, contacts, setSelectedContact, usersActive } =
    ChatState();

  const classes = useStyles();

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/user/getusers/${user.id}`)
        .then((res) => {
          setContacts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleClick = (selectedContact) => {
    setSelectedContact(selectedContact);
  };

  return (
    <div className={classes.toplevel}>
      <div className={classes.brandContainer}>
        <h3 className={classes.heading}>CHATTY</h3>
        <Logout socket={socket} />
      </div>
      <div className={classes.container}>
        {contacts &&
          contacts.map((contact) => {
            const flag = usersActive.indexOf(contact._id) !== -1 ? true : false;
            return (
              <ContactTile
                imageUrl={contact.avatarImage}
                title={contact.name}
                subTitle={contact.email}
                handleClick={() => handleClick(contact)}
                key={contact._id}
                isActive={flag}
              />
            );
          })}
      </div>
    </div>
  );
};

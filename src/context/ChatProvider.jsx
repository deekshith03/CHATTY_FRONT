import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState();
  const [selectedContactMessages, setSelectedContactMessages] = useState();
  const [usersActive, setUsersActive] = useState([]);

  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  if (!user) navigate("/");

  return (
    <ChatContext.Provider
      value={{
        selectedContact,
        setSelectedContact,
        user,
        setUser,
        contacts,
        setContacts,
        selectedContactMessages,
        setSelectedContactMessages,
        usersActive,
        setUsersActive,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

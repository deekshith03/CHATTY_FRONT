import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatProvider from "./context/ChatProvider";
import AuthScreen from "./pages/AuthScreen";
import ChatScreen from "./pages/ChatScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/chats" element={    <ChatProvider><ChatScreen /></ChatProvider>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

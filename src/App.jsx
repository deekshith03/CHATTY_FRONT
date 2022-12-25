import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatProvider from "./context/ChatProvider";
import AuthScreen from "./pages/AuthScreen";
import ChatScreen from "./pages/ChatScreen";


//root component primarily has two routes for chats page and sign in page chats page is wrapped with a provider for easy sharing 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route
          path="/chats"
          element={
            <ChatProvider>
              <ChatScreen />
            </ChatProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

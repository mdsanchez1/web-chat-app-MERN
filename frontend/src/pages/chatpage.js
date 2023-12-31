import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Chat/SideDrawer";
import ChatList from "../components/Chat/ChatList";
import ChatBox from "../components/Chat/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box>
        {user && <ChatList />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;

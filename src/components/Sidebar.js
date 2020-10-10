import { Avatar, IconButton } from "@material-ui/core";
import {
  DonutLargeOutlined,
  ChatOutlined,
  MoreVertOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import React from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://avatars1.githubusercontent.com/u/56771492?s=460&u=4afd2f2ce7b4b534ffe9ac137326d80d511c79d7&v=4" />
        <div className="sidebar_header_right">
          <IconButton>
            <DonutLargeOutlined />
          </IconButton>
          <IconButton>
            <ChatOutlined />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="search_container">
          <SearchOutlined />
          <input type="text" placeholder="Search Chats" />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;

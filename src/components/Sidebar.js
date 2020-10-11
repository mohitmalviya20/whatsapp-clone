import { Avatar, IconButton } from "@material-ui/core";
import {
  DonutLargeOutlined,
  ChatOutlined,
  ExitToApp,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db, { auth } from "./Firebase";
import { useStateValue } from "../StateProvider";

function Sidebar() {
  const [{ user }, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_header_right">
          <IconButton>
            <DonutLargeOutlined />
          </IconButton>
          <IconButton>
            <ChatOutlined />
          </IconButton>
          <IconButton onClick={() => auth.signOut()}>
            <ExitToApp />
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
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

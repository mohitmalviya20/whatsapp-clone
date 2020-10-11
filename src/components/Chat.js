import { Avatar, IconButton } from "@material-ui/core";
import {
  MoreVertOutlined,
  AttachFileOutlined,
  SearchOutlined,
  MicOutlined,
  InsertEmoticonOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./Firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen at{" "}
            {messages[messages.length - 1]?.timestamp?.toDate().toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileOutlined />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonOutlined />
        </IconButton>

        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Type a Message"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <IconButton>
          <MicOutlined />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;

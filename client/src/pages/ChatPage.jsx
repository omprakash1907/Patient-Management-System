import React, { useEffect, useState, useRef } from "react";
import { FaSearch, FaFilePdf } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import userImage from "../assets/images/user.png";
import chatIcon from "../assets/images/chat-icon.png";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const ChatPage = () => {
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");
  let role, loggedInUserId;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      loggedInUserId = decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      window.location.href = "/login";
    }
  } else {
    window.location.href = "/login";
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!role || !token) return;

    const fetchUsers = async () => {
      const endpoint = role === "doctor" ? "/api/users/patients" : "/api/users/doctors";
      try {
        const response = await fetch(`http://localhost:8000${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [role, token]);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/chats/${selectedChat}/messages`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setMessages(data.messages || []);
          scrollToBottom();
        } catch (error) {
          console.error("Error fetching messages:", error);
          setMessages([]);
        }
      };

      fetchMessages();
      socket.emit("joinChat", { chatId: selectedChat });
    }
  }, [selectedChat, token]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const startChat = async (user) => {
    try {
      const response = await fetch("http://localhost:8000/api/chats/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId: user._id, sender: loggedInUserId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error details:", errorData);
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setSelectedChat(data.chatId);
      setSelectedChatUser(user);
      setMessages([]);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const sendMessageResponse = await fetch(`http://localhost:8000/api/chats/${selectedChat}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (!sendMessageResponse.ok) {
        throw new Error(`Error ${sendMessageResponse.status}: ${sendMessageResponse.statusText}`);
      }

      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const filteredUserList = userList.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full p-6">
      <div className="w-1/5 bg-white shadow-sm p-4 rounded-s-xl">
        <h2 className="text-xl font-semibold">Chat</h2>
        <div className="relative mt-4 mb-6">
          <input
            type="text"
            placeholder={`Search ${role === "doctor" ? "Patient" : "Doctor"}`}
            className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-3 right-4 text-gray-500" />
        </div>
        <div className="space-y-2 h-full overflow-y-auto">
          {filteredUserList.length > 0 ? (
            filteredUserList.map((user) => (
              <div
                key={user._id}
                onClick={() => startChat(user)}
                className={`flex items-center p-2 cursor-pointer ${selectedChatUser && selectedChatUser._id === user._id ? "bg-blue-100" : ""}`}
              >
                <img
                  src={`http://localhost:8000/${user.profileImage || userImage}`}
                  alt="avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{user.firstName} {user.lastName}</p>
                  <p className="text-gray-500">Last message preview...</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 py-4 h-full">
              <img src={chatIcon} alt="icon" className="h-24 w-24" />
              <p className="py-4">No users found</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-4/5 bg-gray-50 flex flex-col rounded-e-xl shadow-inner ">
        {selectedChatUser ? (
          <>
            <div className="flex items-center p-4 bg-white border-b">
              <img src={`http://localhost:8000/${selectedChatUser.profileImage || userImage}`} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="font-semibold">{selectedChatUser.firstName} {selectedChatUser.lastName}</h3>
                <p className="text-gray-500">Last seen at 9:00 PM</p>
              </div>
            </div>
            <div className="flex-1 p-4 space-y-2 overflow-y-auto" ref={messagesEndRef}>
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender._id === loggedInUserId ? "justify-end" : "justify-start"}`}>
                  <div className={`p-3 rounded-lg ${message.sender._id === loggedInUserId ? "bg-customBlue text-white" : "bg-gray-200 text-gray-800"}`}>
                    {message.content.endsWith(".pdf") ? (
                      <div className="flex items-center space-x-2">
                        <FaFilePdf className="text-red-600" />
                        <p>{message.content}</p>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                    <span className={`text-xs ${message.sender._id === loggedInUserId ? "text-white" : "text-gray-500"} block mt-1`}>{new Date(message.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="flex items-center px-4 py-3 bg-white border-t">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={sendMessage} className="ml-2 bg-customBlue text-white px-4 py-2 rounded-lg">Send</button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <img src={chatIcon} alt="No chat" />
            <p className="text-xl text-gray-400 py-6">No chat selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

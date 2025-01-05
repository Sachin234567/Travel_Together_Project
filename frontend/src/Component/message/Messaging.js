import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Messaging.css"; // Add styling as needed

const Messaging = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newConversationParticipant, setNewConversationParticipant] =
    useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);

  const isLoggedIn = Boolean(user && user.email);

  useEffect(() => {
    console.log("Received user:", user); // Debugging: Check user object
    if (isLoggedIn) {
      axios
        .get(
          `http://localhost:8080/api/user/conversations?userEmail=${user.email}`
        )
        .then((response) => {
          setConversations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching conversations:", error);
        });
    }
  }, [isLoggedIn, user]);

  const selectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    axios
      .get(
        `http://localhost:8080/api/messages?conversationId=${conversationId}`
      )
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  const sendMessage = () => {
    if (!isLoggedIn) {
      alert("You need to log in to send messages.");
      return;
    }
    if (newMessage.trim() === "") return;

    const message = {
      sender: user.email,
      content: newMessage,
      conversation: { id: selectedConversation },
    };

    axios
      .post("http://localhost:8080/api/messages", message)
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const startConversation = () => {
    if (!isLoggedIn) {
      alert("You need to log in to start a conversation.");
      return;
    }

    const newConversation = {
      participants: [user.email, newConversationParticipant],
    };

    axios
      .post("http://localhost:8080/api/conversations", newConversation)
      .then((response) => {
        setConversations((prevConversations) => [
          ...prevConversations,
          response.data,
        ]);
        setNewConversationParticipant("");
      })
      .catch((error) => {
        console.error("Error starting conversation:", error);
      });
  };

  return (
    <div className="messaging-container">
      <div className="conversations">
        <h3>Your Conversations</h3>
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              onClick={() => selectConversation(conversation.id)}
            >
              {conversation.participants
                .filter((p) => p !== user.email)
                .join(", ")}
            </li>
          ))}
        </ul>
      </div>
      <div className="messages">
        <h3>Messages</h3>
        {selectedConversation ? (
          <>
            <div className="messages-list">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.sender === user.email ? "sent" : "received"
                  }
                >
                  <strong>{message.sender}</strong>: {message.content}
                </div>
              ))}
            </div>
            <div className="new-message">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a conversation to view messages.</p>
        )}
      </div>
      <div className="start-conversation">
        <input
          type="text"
          placeholder="Enter user email"
          value={newConversationParticipant}
          onChange={(e) => setNewConversationParticipant(e.target.value)}
        />
        <button onClick={startConversation}>Start Conversation</button>
      </div>
    </div>
  );
};

export default Messaging;

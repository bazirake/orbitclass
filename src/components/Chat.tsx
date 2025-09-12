import React from 'react'
import { useEffect, useState } from 'react';
//import socket from '../Services/socket';
function Chat() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // useEffect(() => {
  // //   socket.on("receive_message", (msg) => {
  // //     setMessages(prev => [...prev, msg]);
  // //   });

  //   return () => {
  //     socket.off("receive_message");
  //   };
  // }, []);

  // const sendMessage = () => {
  //   if (input.trim() === "") return;
  //   const msg = { text: input, time: Date.now(), sender: "Me" };
  //   socket.emit("send_message", msg);
  //   //setMessages(prev => [...prev, msg]);
  //   setInput("");
  // };

  return (
  <div>
      {/* <div>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.sender}:</b> {m.text}
          </div>
        ))}
      </div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button> */}
    </div>
  )
}

export default Chat

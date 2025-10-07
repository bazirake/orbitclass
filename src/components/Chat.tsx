  import React from 'react'
  import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
  import { useEffect, useState } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css'; 
  import 'bootstrap/dist/js/bootstrap.bundle.min';
  import "../components/chat.css"
  
  import  io  from "socket.io-client";
import StudentInfo from './StudentInfo';
import { ApiResponsedepartment, ApiResponsedepartments, Department, Departments, formatLocalTime, Message } from '../Services/Objects';
import { api } from '../Services/api';
import { data } from 'react-router-dom';
import Course from './Course';
  const socket = io("http://localhost:3001");
  function Chat(){
  
 // const [message,setMessage] =useState('');
 // const [messages,setMessages]=useState<any[]>([]);
   const storedAuth=localStorage.getItem('auth');
   const userinfo=storedAuth ? JSON.parse(storedAuth) : null;
   const userid = localStorage.getItem("userid") ?? "";
  // const userinfo = JSON.parse(localStorage.getItem('auth')!);
   const[departments,setDepartment]=useState<Department[]>([]);
   const[departmentss,setDepartments]=useState<Departments[]>([]);
   const[onedept,setoneDepartment]=useState('');
   const [activeDept, setActiveDept] = useState(1);
   const [room,setRoom]=useState(0);
   const [myid,setMyid]=useState('');
   const [file, setFile] = useState(null);
   const [myids,setMyids]=useState('')
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

   socket.on("connect", () => {
   console.log("you have connected to server");
   socket.on("myid",(id:string)=>{
   setMyid(id)
   console.log("real time",id);
   console.log(myid)
     })
  });

 
  useEffect(() => {
   // alert(userid);
  localStorage.setItem("userid",userinfo?.user?.id);
  // fetch deps & messages
  fetchDepartments();
  fetchDepartment();
  fetchMessages(room);

  // Join room
  createRoom(room);

  // ✅ Single chatMessage listener only
  const handleChatMessage = (msg: Message) => {
    if (msg.room === room) {
      setMessages((prev) => [...prev, msg]);
    }
  };

  socket.on("chatMessage", handleChatMessage);

  return () => {
    socket.off("chatMessage", handleChatMessage); // cleanup properly
  };
}, [room]); // ⚡️ no [socket], only re-run when room changes

  

   const fetchMessages=async(rooms:any)=>{
    try{
      const res = await api.get(`/api/messages/${rooms}`);
        setMessages(res.data);
      }catch(err) {
         alert('error fetching message from database');
      }
    };


     const fetchDepartments = async () => {
       //etIsLoading(true);
       try {
         const response = await api.get<ApiResponsedepartments>(
           "/departments" // replace with your API URL
         );
         setDepartments(response.data.results); // set API array to state
        console.log("hello datataa",response.data.results);
       } catch (err) {
        // setError("Failed to fetch departments");
       } finally {
         //setIsLoading(false);
       }
     }


 const fetchDepartment = async () => {
       //etIsLoading(true);
       try {
         const response = await api.get<Department[]>(
           "/department" // replace with your API URL
         );
         setDepartment(response.data); // set API array to state
        console.log("hello datataa",response.data);
       } catch (err) {
        // setError("Failed to fetch departments");
       } finally {
         //setIsLoading(false);
       }
     }

    const sendMessage = async () => {
  if (!newMessage) return;

  try {
    await api.post("/insertmessage", {
      sender_id:userid,
      sender_name:userinfo?.user?.fullname,
      room,
      content:newMessage,
    });
    setNewMessage(""); // clear input
  } catch (err) {
    console.error("Error sending message:", err);
  }
};


      const createRoom =(roo:any)=>{
         //if(!roo.trim()) return;
          socket.emit("createRoom",roo);
          socket.on("checking",(data:any)=>{
          console.log("checking",data)
          })
          //setRoomName("");
          };
   
// Handle file selection
 const handleFileUpload = (event:any) => {
    const selectedFile = event.target.files[0]; // Get the first file (single file upload)
    if (selectedFile) {
      setFile(selectedFile.name);
      
      console.log('Selected file:', selectedFile.name);
    }
  };
const pad = (n: number) => n.toString().padStart(2, "0");
  const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} `
       + `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};
  return(
   <div className='container'>
   <div className='row'>
    <div className="col-md-4">
      {/* chat groups */}
     <div className="room-list mt-4">
         <h5 className='text-center'>Notify Dept</h5>
<div className="list-group" id="roomList">
  {departments.map((item, index) => (
    <div
      key={index}
      className={`list-group-item rounded d-flex align-items-center ${
        activeDept === item.department_id ? "active" : ""
      }`}

      onClick={() => {
        setActiveDept(item.department_id);
        fetchMessages(item.department_id)
        setoneDepartment(item.department_name);
        setMessages([]);
        createRoom(item.department_id);
        setRoom(item.department_id);
      }}
      
      style={{ cursor: "pointer" }}
    >
      {/* Bootstrap Icon */}
      <i className="bi bi-book-fill me-2 fs-5 text-primary"></i>
      {/* Department Name */}
      <span className="fs-6">
        <small>{item.department_name}</small>
      </span>
    </div>
  ))}
</div>
      </div>
    </div>
    <div className="col-md-8">
  <div className="chat-panel">
    <div className="chat-header">  
    <h5 className="mb-0 d-flex align-items-center">
        <i className="bi bi-chat-dots-fill me-2"></i>
         {onedept}&nbsp;Chat Room
        <span className="badge bg-danger badge-unread" id="unreadBadge" style={{display:'none'}}>0</span>
      </h5>

    </div>
    <div className="chat-body" id="chatBody">
     {/* -- Messages will be appended */}
   {messages.length === 0 && <p className='text-muted'>No conversations started</p>}
    {messages.map((msg, idx) => (
    <div key={idx} 
      className={`d-flex mb-2 ${msg.sender_id===userid ? 'justify-content-end' : ''}`}>
        
      <div 
        className={`p-2 rounded-3 shadow-sm ${
          msg.sender_id ===userid ? '' : 'bg-light'
        }`} 
        style={{minWidth:'75%!important'}}>
        <span className='d-flex flex-column'>
        {msg.sender_id !==userid &&    <small className="fw-bold">

        <i className="bi bi-user-circle fs-3 me-2 text-secondary"></i>
          {msg.sender_name}</small>}
        <small className="text-muted">{formatLocalTime(msg.time)}</small>
        </span>
         <p style={{
           maxWidth: '60%!important',
          }} className={`px-2 py-1 rounded-1 ${msg.sender_id===userid ? 'bg-secondary text-white':''}`}>
           {msg.content}
         </p>
      </div>
    </div>
  ))}

  </div>
  <div className="chat-footer">
      <form onSubmit={(e)=>{
    e.preventDefault()
    if(!newMessage) return;
      setNewMessage('')
      sendMessage()
   }}>
    <div className="input-group">
      <input type="text" id="messageInput" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className="form-control" placeholder="Type a message..." aria-label="Message"/>
      <button className="btn btn-primary" type="submit" id="sendButton">
      <i className="bi bi-send-fill"></i></button>
     </div>
     </form>
     </div>
     </div>
    </div>
   </div>
 </div>
  )
}
export default Chat


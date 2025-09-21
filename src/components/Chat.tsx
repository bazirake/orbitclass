  import React from 'react'
  import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
  import { useEffect, useState } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css'; 
  import 'bootstrap/dist/js/bootstrap.bundle.min';
  import "../components/chat.css"
  
  import  io  from "socket.io-client";
import StudentInfo from './StudentInfo';
import { ApiResponsedepartment, ApiResponsedepartments, Department, Departments } from '../Services/Objects';
import { api } from '../Services/api';
import { data } from 'react-router-dom';
import Course from './Course';
  const socket = io("http://localhost:3001");
  function Chat(){
  
  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState<any[]>([]);
  const storedAuth=localStorage.getItem('auth');
   const userinfo=storedAuth ? JSON.parse(storedAuth) : null;
  // const userinfo = JSON.parse(localStorage.getItem('auth')!);
   const[departments,setDepartment]=useState<Department[]>([]);
   const[departmentss,setDepartments]=useState<Departments[]>([]);
   const[onedept,setoneDepartment]=useState<Departments>();
   const [activeDept, setActiveDept] = useState(0);
   const [rooms,setRoom]=useState('');
  const [myid,setMyid]=useState('');
  const [file, setFile] = useState(null);
 // const [myids,setMyids]=useState('')
    socket.on("connect", () => {
    console.log("you have connected to server");
    socket.on("myid",(id:string)=>{
      
    //const socketid=localStorage.getItem("socketid")!;
    setMyid(id)
  
    // Store the new one
    //sessionStorage.setItem('socketid', id);
    //localStorage.setItem("socketid",id)
     //console.log("received fdsdsds",id)
    // const socketid=sessionStorage.getItem("socketid")!;
     //const socketids=sessionStorage.getItem("socketid")!;
    // setMyids(socketids);
     console.log("real time",id);
     console.log(myid)
     })
  });

  useEffect(()=>{
     socket.on("sendback", (msg:any) => {
    console.log("hello bacend");
     const newMsg = { id: msg.id, conte:msg.conte};
     setMessages((prev)=>[...prev,msg]);//push correctly
     console.log('hh',msg)
  });
  console.log("sendand receiving",messages)

fetchDepartments()
 },[socket])
  
   const fetchOneDepartments = async (id:any) => {
    //alert(id);
       //etIsLoading(true);
       try{
         const response = await api.get<Departments>(
           `/api/department/${id}` // replace with your API URL
         );
         console.log(response.data)
         const roomnumber=`${response.data.department_id}${response.data.level_id}`;
         setRoom(roomnumber);
         //alert(response.data.department_id)
         //setRoom(roomnumber)
         //sessionStorage.removeItem("room")
         //sessionStorage.setItem("room",roomnumber)
         //const socketid=sessionStorage.getItem("room")!;
         setoneDepartment(response.data);//set API array to state
         //console.log(socketid);
       } catch (err){
        // setError("Failed to fetch departments");
       } finally {
         //setIsLoading(false);
       }
     }

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
      const createRoom =(roo:string)=>{
         //  alert(roo)
           // if(!roo.trim()) return;
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

  return(
   <div className='container'>
   <div className='row'>
    <div className="col-md-2">
      {/* chat groups */}
     <div className="room-list mt-3">
         <h5 className='text-center'>Notify Dept</h5>
        <div className="list-group" id="roomList">
         {departmentss.map((item,index) => (
        <div
          key={index}
          className={`list-group-item rounded ${
            activeDept ===index ? "active" : ""
          }`}
          onClick={() =>{setActiveDept(index);fetchOneDepartments(item.level_id);
               //const getroom=localStorage.getItem("room")!;
              /// if(!getroom || !getroom.trim()) return;
             //alert(my)
            // alert('helo')
           // const socketid=sessionStorage.getItem("room")!;
              setMessages([])
              createRoom(rooms)
               //alert(getroom)
          }}
          style={{cursor:"pointer"}}
        >
          <i className="bi bi-book-fill me-2"></i>
          <div className='d-flex flex-column'>
          <strong>{item.department_name}</strong> 
          
          {item.description}
          </div>
        </div>
      ))}
        </div>
      </div>

    </div>
    <div className="col-md-10">
  <div className="chat-panel">
    <div className="chat-header">
      
    <h5 className="mb-0 d-flex align-items-center">
        <i className="bi bi-chat-dots-fill me-2"></i>
          {onedept?.description}-{onedept?.department_name}&nbsp;Chat Room
        <span className="badge bg-danger badge-unread" id="unreadBadge" style={{display:'none'}}>0</span>
      </h5>
    </div>
    <div className="chat-body" id="chatBody">
     {/* -- Messages will be appended */}
   {messages.length === 0 && <p className='text-muted'>No conversations started</p>}
    {messages.map((msg, idx) => (
    <div key={idx} 
      className={`d-flex mb-2 ${msg.id ===myid ? 'justify-content-end' : ''}`}>
      <div 
        className={`p-2 rounded-3 shadow-sm ${
          msg.room ===myid ? '' : 'bg-light'
        }`} 
        style={{minWidth:'75%!important'}}>
        <span className='d-flex flex-column'>
        <small className="fw-bold">{msg.senderName}</small>
        <small className="text-muted">{msg.time}</small>
  
        <small className="text-muted">{msg.room}</small> 
        <small className="text-muted">{msg.id}</small>
        <small className="text-muted">{myid}</small>
        <small className="text-muted">{msg.course}</small>
        </span>
         <p style={{
           maxWidth: '60%!important',
        }} className={`px-2 py-1 rounded-1 ${msg.id===myid ? 'bg-primary text-white':''}`}>
          {msg.conte}
         </p>
      </div>
    </div>
  ))}

  </div>
  <div className="chat-footer">
      <form onSubmit={(e)=>{
    e.preventDefault()
    if(!message) return;
   // const getroom=sessionStorage.getItem("room")!;
   // const socketid=localStorage.getItem("socketid")!;
    //const socketid=sessionStorage.getItem("socketid")!;
    //alert(userinfo?.user?.fullname)
    const newMsg ={
      id:myid,
      senderName: userinfo?.user?.fullname,
      senderAvatar:'bi bi-list',
      conte: message,
      room:rooms,
      course:file,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
     socket.emit("sendmessage",newMsg)
     setMessage('')
   }}>
    <div className="input-group">
      <input type="text" id="messageInput" value={message} onChange={(e)=>setMessage(e.target.value)} className="form-control" placeholder="Type a message..." aria-label="Message"/>
      <button className="btn btn-primary" type="submit" id="sendButton">
          <input
    type="file"
    id="fileUpload"
    style={{ display: 'none' }}
    onChange={handleFileUpload} // <- add your handler here
  />
  <label htmlFor="fileUpload" className="btn btn-primary">
    <i className="bi bi-paperclip"></i>
  </label>
         <i className="bi bi-send-fill"></i></button>
          {/* Upload file button */}


  {/* Send button */}
 
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


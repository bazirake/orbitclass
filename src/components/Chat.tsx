import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../components/chat.css';
import io from 'socket.io-client';
import StudentInfo from './StudentInfo';
import { ApiResponsedepartment, ApiResponsedepartments, Department, Departments, formatLocalTime, Message } from '../Services/Objects';
import { api } from '../Services/api';
import { data } from 'react-router-dom';
import Course from './Course';
import { useNotify } from './NotifyProvider';

const socket = io('http://localhost:3001');

function Chat() {
  const storedAuth = localStorage.getItem('auth');
  const userinfo = storedAuth ? JSON.parse(storedAuth) : null;
  const userid = localStorage.getItem('userid') ?? '';
  const [departments, setDepartment] = useState<Department[]>([]);
  const [departmentss, setDepartments] = useState<Departments[]>([]);
  const [onedept, setoneDepartment] = useState('');
  const [activeDept, setActiveDept] = useState(0); // Default to 0
  const [room, setRoom] = useState(0);
  const [myid, setMyid] = useState('');
  const [file, setFile] = useState(null);
  const [myids, setMyids] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userDepartment, setUserDepartment] = useState(0); // User's department ID
   const { chatReport } =useNotify();

  // Get user's department from localStorage (assuming userinfo.user.department_id exists)
  // If not available, fetch it via API (see fetchUserDepartment function)
  const fetchUserDepartment = async () => {
    try {
      // Option 1: If department_id is in userinfo.user.department_id
      if (userinfo?.user?.department_id) {
        setUserDepartment(userinfo.user.department_id);
        return;
      }

      // Option 2: Fetch from API if not in localStorage (e.g., /api/user/${userid})
      const response = await api.get(`/api/user/${userid}`); // Assume endpoint returns { department_id: number }
      const userDept = response.data.department_id;
      setUserDepartment(userDept);
      console.log('User department fetched:', userDept);
    } catch (err) {
      console.error('Failed to fetch user department:', err);
      alert('Unable to load your department. Please log in again.');
    }
  };

  socket.on('connect', () => {
    console.log('You have connected to server');
    socket.on('myid', (id: string) => {
      setMyid(id);
      console.log('Real time ID:', id);
    });
  });

  useEffect(() => {
    chatReport("chat")
    localStorage.setItem('userid', userinfo?.user?.id || '');
    fetchUserDepartment(); // Fetch user's department first
    fetchDepartments();
    fetchDepartment();
  }, []); // Initial load

  // Re-run effects after userDepartment is set
  useEffect(() => {
    if (userDepartment > 0) {
      // Auto-join user's department chat room on load
      const userDeptObj = departments.find((dept) => dept.department_id === userDepartment);
      if (userDeptObj) {
        setActiveDept(userDepartment);
        setoneDepartment(userDeptObj.department_name);
        setRoom(userDepartment);
        fetchMessages(userDepartment);
        createRoom(userDepartment);
      }
    }
  }, [userDepartment, departments]);

  useEffect(() => {
    if (room > 0) {
      fetchMessages(room);
      createRoom(room);

      const handleChatMessage = (msg: Message) => {
        if (msg.room === room) {
          setMessages((prev) => [...prev, msg]);
        }
      };

      socket.on('chatMessage', handleChatMessage);

      return () => {
        socket.off('chatMessage', handleChatMessage);
      };
    }
  }, [room]);

  const fetchMessages = async (rooms: any) => {
    try {
      const res = await api.get(`/api/messages/${rooms}`);
      setMessages(res.data);
    } catch (err) {
      alert('Error fetching messages from database');
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await api.get<ApiResponsedepartments>('/departments');
      setDepartments(response.data.results);
      console.log('Departments data:', response.data.results);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await api.get<Department[]>('/department');
      setDepartment(response.data);
      console.log('Department data:', response.data);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage || room !== userDepartment) return; // Prevent sending if not in user's department

    try {
      await api.post('/insertmessage', {
        sender_id: userid,
        sender_name: userinfo?.user?.fullname,
        room,
        content: newMessage,
      });
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const createRoom = (roo: any) => {
    if (roo !== userDepartment) return; // Prevent joining non-user department
    socket.emit('createRoom', roo);
    socket.on('checking', (data: any) => {
      console.log('Checking room:', data);
    });
  };

  // Handle file selection
  const handleFileUpload = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile.name);
      console.log('Selected file:', selectedFile.name);
    }
  };

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  // Filter departments to only show user's department
  const userDeptItem = departments.find((dept) => dept.department_id === userDepartment);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          {/* Chat groups */}
          <div className="room-list mt-4">
            <h5 className="text-center">Notify Dept</h5>
            {userDepartment === 0 ? (
              <p className="text-center text-muted">Loading your department...</p>
            ) : userDeptItem ? (
              <div className="list-group" id="roomList">
                <div
                  className={`list-group-item rounded d-flex align-items-center ${
                    activeDept === userDeptItem.department_id ? 'active' : ''
                  }`}
                  onClick={() => {
                    setActiveDept(userDeptItem.department_id);
                    fetchMessages(userDeptItem.department_id);
                    setoneDepartment(userDeptItem.department_name);
                    setMessages([]);
                    createRoom(userDeptItem.department_id);
                    setRoom(userDeptItem.department_id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-book-fill me-2 fs-5 text-primary"></i>
                  <span className="fs-6">
                    <small>{userDeptItem.department_name} (Your Department)</small>
                  </span>
                </div>
              </div>
            ) : (
              <div className="alert alert-warning">
                <strong>No Department Access</strong>: You are not assigned to any department. Contact an administrator.
              </div>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div className="chat-panel">
            <div className="chat-header">
              <h5 className="mb-0 d-flex align-items-center">
                <i className="bi bi-chat-dots-fill me-2"></i>
                {onedept} &nbsp; Chat Room
                <span className="badge bg-danger badge-unread" id="unreadBadge" style={{ display: 'none' }}>
                  0
                </span>
              </h5>
            </div>
            <div className="chat-body" id="chatBody">
              {messages.length === 0 && <p className="text-muted">No conversations started</p>}
              {messages.map((msg, idx) => (
                <div key={idx} className={`d-flex mb-2 ${msg.sender_id === userid ? 'justify-content-end' : ''}`}>
                  <div
                    className={`p-2 rounded-3 shadow-sm ${msg.sender_id === userid ? '' : 'bg-light'}`}
                    style={{ minWidth: '75%!important' }}
                  >
                    <span className="d-flex flex-column">
                      {msg.sender_id !== userid && (
                        <small className="fw-bold">
                          <i className="bi bi-user-circle fs-3 me-2 text-secondary"></i>
                          {msg.sender_name}
                        </small>
                      )}
                      <small className="text-muted">{formatLocalTime(msg.time)}</small>
                    </span>
                    <p
                      style={{
                        maxWidth: '60%!important',
                      }}
                      className={`px-2 py-1 rounded-1 ${msg.sender_id === userid ? 'bg-secondary text-white' : ''}`}
                    >
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-footer">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newMessage) return;
                  setNewMessage('');
                  sendMessage();
                }}
              >
                <div className="input-group">
                  <input
                    type="text"
                    id="messageInput"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="form-control"
                    placeholder="Type a message..."
                    aria-label="Message"
                    disabled={room !== userDepartment} // Disable input if not in user's department
                  />
                  <button className="btn btn-primary" type="submit" id="sendButton" disabled={room !== userDepartment}>
                    <i className="bi bi-send-fill"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
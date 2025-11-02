import React, { ReactNode, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../components/menu.css"
import { api } from '../Services/api';

import NotifyProvider from "../components/NotifyProvider";
import NotificationBell from "../components/NotificationBell";

interface SidebarItem {
   label:string;
   href:string;
   icon?:string;
}

interface LayoutProps {
  sidebarItems:SidebarItem[];
  children:ReactNode;
}



const Layout: React.FC<LayoutProps> = ({sidebarItems,children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navi=useNavigate();
  const userinfo = JSON.parse(localStorage.getItem('auth')!);

  const logout=async ()=>{
  const respo=await api.post("api/logout").then(()=>{navi("/"); localStorage.clear()})
}

  return (
    <div className="d-flex flex-column vh-100">
           {/*Topbar*/}
      <nav className="navbar navbar-expand-lg navbar-dark topbar-color">
        <div className="container-fluid">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className="bi bi-list"></i>
          </button>
          <a className="navbar-brand" href="#">
            KDU-OrbitClass
          </a>
          
          
     <NotifyProvider>
      <div>
        <NotificationBell/>
      </div>
    </NotifyProvider>

          <div className="dropdown ms-auto">
  <button
    className="btn dropdown-toggle d-flex align-items-center"
    type="button"
    id="userMenuButton"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <span className="me-2 border rounded px-1" style={{color:'white'}}>{userinfo.user.levels}</span>
    <span className="me-2 border rounded px-1" style={{color:'white'}}>{userinfo.user.type_name}</span>
    <span className="me-2 border rounded px-1" style={{color:'white'}}>{userinfo.user.department_name}</span>
    <span className="me-2 border rounded px-1" style={{color:'white'}}>{userinfo.user.fullname}</span>
    <i className="bi bi-person-circle"></i>
  </button>

  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
    <li>
      <Link className="dropdown-item" to="setting">
        <i className="bi bi-gear me-2"></i> Settings
      </Link>
    </li>
    <li><hr className="dropdown-divider" /></li>
    <li>
      <button className="dropdown-item"  onClick={logout}>
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </button>
    </li>
  </ul>
</div>
</div>
</nav>

      {/* Main Area */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className={`bg-light border-end p-3 ${
            collapsed ? 'd-none d-md-block' : ''
          }`}
          style={{ width:'250px' }}
        >
     <ul className="nav nav-pills flex-column">
      {sidebarItems.map((item, i) => (
        <li className="nav-item" key={i}>
          <NavLink
            to={item.href}
            className={({ isActive }) =>
              `nav-link link-dark ${isActive ? 'active' : ''}`
            }
          >
            {item.icon && <i className={`me-2 ${item.icon}`} />}
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
        </div>
        {/* Content */}
        <div className="flex-grow-1 d-flex flex-column">
          <main className="flex-grow-1 p-4">{children}</main>
           {/* Footer */}
          <footer className="buttonbar-color text-light text-center py-3">
             &copy;{new Date().getFullYear()} KDU-OrbitClass.All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};
export default Layout;

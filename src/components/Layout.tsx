import React, { ReactNode, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, NavLink } from 'react-router-dom';
import "../components/menu.css"

interface SidebarItem {
   label:string;
   href:string;
   icon?:string;
}

interface LayoutProps {
  sidebarItems: SidebarItem[];
  children:ReactNode;
}

const Layout: React.FC<LayoutProps> = ({sidebarItems,children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex flex-column vh-100">
      {/* Topbar */}
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
          <div className="d-flex ms-auto text-white">
            <span className="me-3">Peter</span>
            <i className="bi bi-person-circle"></i>
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
            &copy; {new Date().getFullYear()} KDU-OrbitClass.All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;

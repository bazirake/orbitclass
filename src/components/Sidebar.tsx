import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface SidebarProps {
  items:{ label: string; href: string; icon?: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">My Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {items.map((item, index) => (
          <li className="nav-item" key={index}>
            <a href={item.href} className="nav-link link-dark">
              {item.icon && <i className={`me-2 ${item.icon}`} />}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

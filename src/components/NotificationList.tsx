// src/components/NotificationList.tsx
import React from "react";
import "../components/NotificationList.css";

interface NotificationData {
  type: string;
  message: string;
}

interface Props {
  notifications: NotificationData[];
  onClose: () => void;
}

const NotificationList: React.FC<Props> = ({ notifications, onClose }) => {
  // ✅ Reverse so newest notifications appear first
  const sortedNotifications = [...notifications].reverse();

  return (
    <div className="notification-list">
      <div className="notification-header">
        <span>Notifications</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="notification-body">
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((n, i) => (
            <div key={i} className="notification-item">
              {n.message}
            </div>
          ))
        ) : (
          <div className="empty-msg">No new notifications</div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;

import React, { useEffect } from "react";
import { useNotify } from "../components/NotifyProvider";
import "../components/NotificationBell.css";

const NotificationBell: React.FC = () => {
  const { count, showNotifications } = useNotify();

//   useEffect(()=>{
//     alert(count)
//   },[])

  return(

  <div className="notification-container" onClick={showNotifications}>
  <i className="bi bi-bell notification-icon"></i>
  { count > 0 && (
      <span className="notification-badge">
        {count >5 ? "5+" : count}
     </span>
   )}
</div>
  );
};

export default NotificationBell;
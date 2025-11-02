import React, { useEffect, useState } from 'react'
import "./timetable.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TimetableTabs from './TimetableTabs';
import CreateTb from './CreateTb';
import { useNotify } from './NotifyProvider';

function Timetable() {
  const [activeTab, setActiveTab] = useState("Prepare");
  const userinfo = JSON.parse(localStorage.getItem('auth')!);
  const userType = userinfo?.user?.usertype || 0;
  const canViewTimeTable = Number(userType) === 1;
   const { visitMenu } = useNotify();
 useEffect(() => {
    visitMenu("timetable"); // Emit event when page is visited
  }, []);

  return (
    <div className="container mt-2">
      <h4 className="text-center mb-2">Weekly Class Timetable</h4>
      
      {/* Nav Tabs */}
      <ul className="nav nav-tabs">
        {canViewTimeTable ? (
          <>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "Prepare" ? "active" : ""}`}
                onClick={() => setActiveTab("Prepare")}
              >
                Prepare
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "View" ? "active" : ""}`}
                onClick={() => setActiveTab("View")}
              >
                View
              </button>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "View" ? "active" : ""}`}
              onClick={() => setActiveTab("View")}
            >
              View
            </button>
          </li>
        )}
      </ul>

      {/* Tab Content */}
      <div className="tab-content p-3 border border-top-0">
        {canViewTimeTable ? (
          activeTab === "Prepare" ? (
            <div className="tab-pane fade show active">
              <CreateTb />
            </div>
          ):(
            <div className="tab-pane fade show active">
              <TimetableTabs />
            </div>
          )
        ) : (
          <div className="tab-pane fade show active">
            <TimetableTabs />
          </div>
        )}
      </div>
    </div>
  );
}

export default Timetable;
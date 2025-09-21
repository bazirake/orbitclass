import React, { useState } from 'react'
import "./timetable.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TimetableTabs from './TimetableTabs';
import CreateTb from './CreateTb';
function Timetable() {

  const [activeTab,setActiveTab] = useState("Prepare");
  return (
    <div className="container mt-2">
      <h4 className="text-center mb-2">Weekly Class Timetable</h4>
      {/* Nav Tabs */}
      <ul className="nav nav-tabs">
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
     
      </ul>

      {/* Tab Content */}
      <div className="tab-content p-3 border border-top-0">
        {activeTab === "Prepare" && (
          <div className="tab-pane fade show active">
            <CreateTb/>
          </div>
        )}
         {activeTab === "View" && (
          <div className="tab-pane fade show active">
            <TimetableTabs/>
          </div>
         )}
     
      </div>
    </div>
  );

}

export default Timetable

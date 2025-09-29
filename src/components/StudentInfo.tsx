
import React from 'react'
  import { useState } from 'react'
// import "./timetable.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import TimetableTabs from './TimetableTabs';
import CreateTb from './CreateTb';
import Preparequiz from './Preparequiz';
import Viewquiz from './Viewquiz';
import StudentResult from './StudentResult';
import StudentBasic from './StudentBasic';
function StudentInfo() {
   const [activeTab,setActiveTab] = useState("sresult");
  return (
    <div className="container mt-2">
      <h4 className="text-center mb-1">Student information panel</h4>
      {/* Nav Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "sresult" ? "active" : ""}`}
            onClick={()=>setActiveTab("sresult")}>
            Studentresult
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "sbasic" ? "active" : ""}`}
            onClick={() => setActiveTab("sbasic")}
          >
            Studentdetails
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content p-3 border border-top-0">
        {activeTab === "sresult" && (
          <div className="tab-pane fade show active">
            <StudentResult/>
          </div>
        )}
         {activeTab === "sbasic" && (
          <div className="tab-pane fade show active">
            <StudentBasic/>
          </div>
         )}
      </div>
    </div>
  );
}

export default StudentInfo

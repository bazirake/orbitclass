
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
function Viewcourse() {
   const [activeTab,setActiveTab] = useState("sresult");
  return (
    <div className="container mt-2">
      <h4 className="text-center mb-1">Course information panel</h4>
      {/* Nav Tabs */}
     
     
      
      {/* Tab Content */}
      <div className="tab-content p-3 border border-top-0">
      
       
       
          <div className="tab-pane fade show active">
            <StudentBasic/>
          </div>
        
        
      </div>
    </div>
  );
}

export default Viewcourse

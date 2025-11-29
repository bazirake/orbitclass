import React, { useEffect, useState } from "react";
import { useNotify } from "./NotifyProvider";
import PrepareAssessment from "./PrepareAssessment";
import ViewAssessment from "./ViewAssessment";

// Safely get user info from localStorage
const getUserInfo = () => {
  try {
    const authData = localStorage.getItem("auth");
    if (!authData) return null;
    const parsed = JSON.parse(authData);
    return parsed?.user || null;
  } catch (error) {
    console.error("Failed to parse auth data", error);
    return null;
  }
};

function Assessment() {
  const user = getUserInfo();
  const userType = Number(user?.usertype);
  const isTeacher = userType === 1;

  const [activeTab, setActiveTab] = useState<"Prepare" | "View">(
    isTeacher ? "Prepare" : "View"
  );

  const { assignquizReport } = useNotify();

  useEffect(() => {
    assignquizReport("viewassessment");
  }, [assignquizReport]);

  return (
    <div className="container mt-2">
      <h4 className="text-center mb-4">Prepare / View Assessment</h4>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-3">
        {isTeacher && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Prepare" ? "active" : ""}`}
              onClick={() => setActiveTab("Prepare")}
            >
              Prepare Assessment
            </button>
          </li>
        )}

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "View" ? "active" : ""}`}
            onClick={() => setActiveTab("View")}
          >
            {isTeacher ? "View All Assessments" : "My Assessments"}
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content p-3 border border-top-0 bg-white rounded-bottom">

        {/* Prepare Assessment - Only teachers */}
        {activeTab === "Prepare" && isTeacher && (
          <div className="tab-pane fade show active">
            <PrepareAssessment />
          </div>
        )}

        {/* View Assessment - Everyone */}
        {activeTab === "View" && (
          <div className="tab-pane fade show active">
            <ViewAssessment />
          </div>
        )}

        {/* Student tries to access the teacher-only tab */}
        {activeTab === "Prepare" && !isTeacher && (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-lock-fill fs-1 mb-3"></i>
            <p className="fs-5">You don't have permission to prepare assessments.</p>
            <small>Only teachers can create and manage assessments.</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assessment;

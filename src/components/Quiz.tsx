import React, { useEffect, useState } from "react";
import Preparequiz from "./Preparequiz";
import ListQuiz from "./ListQuiz";
import { useNotify } from "./NotifyProvider";

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

function Quiz() {
  const user = getUserInfo();
  const userType = Number(user?.usertype);
  const isTeacher = userType === 1;

  // Default tab based on the user type
  const [activeTab, setActiveTab] = useState<"Prepare" | "View">(
    isTeacher ? "Prepare" : "View"
  );

  const { assignquizReport } = useNotify();

  useEffect(() => {
    assignquizReport("viewquiz");
  }, [assignquizReport]);

  return (
    <div className="container mt-2">
      <h4 className="text-center mb-4">Prepare Quiz / View Quiz & Assignment</h4>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-3">
        {isTeacher && (
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Prepare" ? "active" : ""}`}
              onClick={() => setActiveTab("Prepare")}
            >
              Prepare Quiz
            </button>
          </li>
        )}

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "View" ? "active" : ""}`}
            onClick={() => setActiveTab("View")}
          >
            {isTeacher ? "View All Quizzes" : "My Quizzes"}
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content p-3 border border-top-0 bg-white rounded-bottom">
        
        {/* Prepare Tab (Teachers Only) */}
        {activeTab === "Prepare" && isTeacher && (
          <div className="tab-pane fade show active">
            <Preparequiz />
          </div>
        )}

        {/* View Tab (Everyone) */}
        {activeTab === "View" && (
          <div className="tab-pane fade show active">
            <ListQuiz/>
          </div>
        )}

        {/* Student tries to access Prepare */}
        {activeTab === "Prepare" && !isTeacher && (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-lock-fill fs-1 mb-3"></i>
            <p className="fs-5">You don't have permission to prepare quizzes.</p>
            <small>Only teachers can create and manage quizzes.</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;

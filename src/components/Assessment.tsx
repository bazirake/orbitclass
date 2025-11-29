import React, { useState } from "react";
import "./Assessment.css"; // custom styling
import { Assess, formatLocalDate } from "../Services/Objects";
import { api } from "../Services/api";

function Assessment() {

  const[assess,setAssess]=useState<Assess[]>([]);                  
   const userinfo = JSON.parse(localStorage.getItem('auth')!);


     const fetchQuizes = async () => {
           //etIsLoading(true);
            try{
               const response = await api.get<Assess[]>(
                      `/quizzes/complete/3/3` // replace with your API URL
               );
                 const quizData = response.data.map((quiz: any) => ({
                 ...quiz,
                  created_at: formatLocalDate(quiz.created_at), // format date for each quiz
                  }));
              setAssess(quizData); // set API array to state
                   console.log("Assess",response.data);
            }catch (err){
                   // setError("Failed to fetch departments");
                  } finally {
                    //setIsLoading(false);
                  }
                }
  return (
    <div className="container py-2 py-lg-2">
      {/* Header */}
      <div className="text-center mb-2">
        <h4 className="display-5 fw-bold text-primary mb-2">
          Assessments & Quizes
        </h4>
        <p className="lead text-muted col-lg-8 mx-auto">
          Manage and complete quizzes, tests in one place.
        </p>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs nav-justified mb-5 border-bottom">
        <li className="nav-item">
          <button
            className="nav-link active fw-semibold fs-5"
            data-bs-toggle="tab"
            data-bs-target="#my-assessments"
          >
            My Assessments
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link fw-semibold fs-5"
            data-bs-toggle="tab"
            data-bs-target="#completed"
          >
            Completed
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link fw-semibold fs-5"
            data-bs-toggle="tab"
            data-bs-target="#upcoming"
          >
            Upcoming
          </button>
        </li>
      </ul>

      {/* Tab Contents */}
      <div className="tab-content">

        {/* ============== My Assessments TAB ============== */}
        <div className="tab-pane fade show active" id="my-assessments">
          <div className="row g-4">
            {/* Assessment Card 1 */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="badge bg-danger fs-6">Due Tomorrow</span>
                    <span className="text-muted small">Math 101</span>
                  </div>

                  <h5 className="fw-bold">Midterm Quiz - Algebra</h5>
                  <p className="text-muted small mb-3">
                    25 Questions • Multiple Choice & Short Answer
                  </p>

                  <div className="d-flex align-items-center text-warning mb-3">
                    <i className="bi bi-clock me-2"></i>
                    <span>45 minutes</span>
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-outline-primary btn-sm">Start Assessment</button>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0">
                  <small className="text-danger fw-semibold">
                    Due: 30 Nov 2025, 11:59 PM
                  </small>
                </div>
              </div>
            </div>

            {/* Assessment Card 2 */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="badge bg-warning text-dark fs-6">Pending</span>
                    <span className="text-muted small">Physics 201</span>
                  </div>

                  <h5 className="fw-bold">Lab Report Submission</h5>
                  <p className="text-muted small mb-3">
                    Upload PDF report + data sheet
                  </p>

                  <div className="d-flex align-items-center text-primary mb-3">
                    <i className="bi bi-file-earmark-arrow-up me-2"></i>
                    <span>File Upload</span>
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-outline-success btn-sm">Upload Now</button>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0">
                  <small className="text-muted">Due: 5 Dec 2025</small>
                </div>
              </div>
            </div>

            {/* Assessment Card 3 */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="badge bg-success fs-6">Open</span>
                    <span className="text-muted small">English 102</span>
                  </div>

                  <h5 className="fw-bold">Essay: Climate Change</h5>
                  <p className="text-muted small mb-3">
                    800–1000 words • APA Format
                  </p>

                  <div className="d-flex align-items-center text-info mb-3">
                    <i className="bi bi-pencil-square me-2"></i>
                    <span>Long Answer</span>
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-outline-info btn-sm">Start Writing</button>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0">
                  <small className="text-muted">Due: 12 Dec 2025</small>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============== Completed TAB (Mock Data) ============== */}
        <div className="tab-pane fade" id="completed">
          <div className="row g-4">
  {assess.map((item, index) => (
    <div key={item.quiz_id || index} className="col-md-6 col-lg-4">
      <div className="card border-0 shadow-sm h-100 hover-lift">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between mb-3">
            <span className="badge bg-success fs-6">Completed</span>
            <span className="text-muted small">{item.quiz_title}</span>
          </div>

          <h5 className="fw-bold">{item.quiz_title}</h5>
          <p className="text-muted small mb-3">
            Score: <strong>{item.deadline ?? "N/A"} / {item.total_marks}</strong>
          </p>

          <div className="d-flex align-items-center text-primary mb-3">
            <i className="bi bi-clipboard-check me-2"></i>
            <span>Submitted on: {item.deadline}</span>
          </div>

          <div className="d-grid">
            <button className="btn btn-outline-primary btn-sm">View Results</button>
          </div>
        </div>
      </div>
    </div>
  ))}




            {/* Completed Assessment 2 */}
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="badge bg-success fs-6">Completed</span>
                    <span className="text-muted small">Physics 201</span>
                  </div>

                  <h5 className="fw-bold">Lab Report Submission</h5>
                  <p className="text-muted small mb-3">
                    Score: <strong>18 / 20</strong>
                  </p>

                  <div className="d-flex align-items-center text-info mb-3">
                    <i className="bi bi-file-earmark-text me-2"></i>
                    <span>Submitted on: 20 Nov 2025, 03:12 PM</span>
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-outline-success btn-sm">View File</button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* ============== Upcoming TAB ============== */}
        <div className="tab-pane fade" id="upcoming">
          <div className="text-center py-5 text-muted">
            <i className="bi bi-calendar3 display-4 mb-3"></i>
            <h5>No upcoming deadlines</h5>
            <p>Relax! You're all caught up!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assessment;

import React, { useEffect, useState } from "react";
import "./Assessment.css"; // custom styling
import { Assess, Department, formatLocalDate, formatLocalDates, QuizAssess, Subject, SubjectsResponse } from "../Services/Objects";
import { api } from "../Services/api";
import { useNavigate } from "react-router-dom";

function Assessment() {
   const userinfo = JSON.parse(localStorage.getItem('auth')!);
   
   const[assess,setAssess]=useState<QuizAssess[]>([]);
   const[courses,setCourses]=useState<Subject[]>([]);
   const Navigate=useNavigate();
   const StartQuiz=(routes:string)=>
     {
        Navigate(routes); 
     }
   useEffect(()=>{
    fetchAssessment();
    fetchCompleted();
    },[]);

         const fetchAssessment = async () => {
          //etIsLoading(true);
            try{
                  const response = await api.get<QuizAssess[]>(
                  "/api/quizzes/ass?department_id=3&level_id=2" // replace with your API URL
              );
             setAssess(response.data); // set API array to state
                  console.log("table",response.data);
           }catch (err){
                  // setError("Failed to fetch departments");
                 } finally {
                   //setIsLoading(false);
                 }
               }

          const fetchCompleted = async () => {
              //etIsLoading(true);
              try{
                   const response = await api.get<SubjectsResponse>(
                   `/api/student/assess/${userinfo.user.id}` // replace with your API URL
                );
               setCourses(response.data.subjects); // set API array to state
                  console.log("Completed",response.data.subjects);
              }catch(err){
                  // setError("Failed to fetch departments");
                 } finally {
                   //setIsLoading(false);
                 }
               }

  return (
    <div className="container py-2 py-lg-2">
      {/* Header */}
      <div className="text-center mb-2">
        <h6 className="display-6 fw-bold text-primary mb-2">
          Assessments & Quizes
        </h6>
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
            Completed assessment
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link fw-semibold fs-5"
            data-bs-toggle="tab"
            data-bs-target="#completed"
          >
           Upcoming assessment
          </button>
        </li>
        
      </ul>

      {/* Tab Contents */}
      <div className="tab-content">
        {/*==============Assessments TAB==============*/}
        <div className="tab-pane fade show active" id="my-assessments">
            <div className="row g-4">

            {/* Completed Assessment 2 */}
           {
            courses.map((item)=>
                        <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-3">
                    <span className="badge bg-success fs-6">Completed</span>
                    <span className="text-muted small">{item.course}</span>
                </div>
                <span >
                  Quiz: <b>{item.quiz_title}</b></span>
                <p className="text-muted small mb-1">
                    Score: <strong>{item.obtained_marks} / {item.max_marks}</strong>
                </p>
                <p className="text-muted small mb-1">
                    Average: <strong>{item.overall_percentage}%</strong>
                </p>
 
   <p className="text-muted small mb-1">
    Grade: 
    <span className={`badge fs-6 ${
    item.overall_grade==='A' ? 'bg-success' :
    item.overall_grade==='B' ? 'bg-primary' :
    item.overall_grade==='C' ? 'bg-info' :
    item.overall_grade==='D' ? 'bg-warning' :
    item.overall_grade==='E' ? 'bg-secondary' :
    'bg-danger'
   }`}>
    {item.overall_grade}
  </span>
  </p>

  <p className="text-muted small mb-1">
    Status:
  <span
    className={`badge fs-6 ${
      item.remark === 'Excellent' ? 'bg-success' :
      item.remark === 'Very Good' ? 'bg-primary' :
      item.remark === 'Good' ? 'bg-info' :
      item.remark === 'Fair' ? 'bg-warning' :
      item.remark === 'Pass' ? 'bg-secondary' :
      'bg-danger'
    }`}
  >
    {item.remark}
  </span>{' '}
   </p>
  <div className="d-flex  text-info mb-3">
      <span className="small">
  Submitted on: <strong>{formatLocalDate(item.deadline)}</strong>
</span>

  </div>
  </div>
  </div>
  </div>
    )
    }
    </div>
    </div>
        {/* ============== Completed TAB (Mock Data) ============== */}
        <div className="tab-pane fade" id="completed">
           <div className="row g-4">
            {/* Assessment Card 1 */}
              {
                assess.map((item)=>
                <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-3">
                    <span className="badge bg-secondary text-capitalize">deadline {formatLocalDate(item.deadline)}</span>
                </div>
                <span className="text-capitalize">quiztitle :<b>&nbsp;{item.quiz_title}</b></span>  
                  <p className="text-muted small mb-3">
                   <span className="text-capitalize">totalquestion:</span>  <b>{item.totalq}</b> <span className="text-capitalize">subject: </span><b>{item.course_name}</b>
                  </p>
                  <div className="d-flex align-items-center text-warning mb-3">
                    <i className="bi bi-clock me-2"></i>
                    <span>{item.duration} minutes</span>
                  </div>
                  <div className="d-grid">
                    <button 
                    className="btn btn-outline-primary btn-sm" onClick={()=>StartQuiz('/main/takequiz')}>Start Assessment</button>
                  </div>
                </div>
              </div>
            </div>
                )
              }
          </div>
        </div>
      </div>
    </div>
  );
}
export default Assessment;

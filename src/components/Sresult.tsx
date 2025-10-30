import React, { useEffect, useState } from "react";
import { StudentResult } from "../Services/Objects";
import { api } from "../Services/api";
import { useParams } from "react-router-dom";

function Sresult() {
  const userinfo =JSON.parse(localStorage.getItem("auth") || "{}");
  const [sresult,setSresult]=useState<StudentResult | null>(null);
  const [error, setError]=useState<string | null>(null);
  const { id, lid } =useParams(); // if you plan to use them later

  useEffect(() => {
    const quizid = Number(localStorage.getItem("quizid") ?? 0);
    const studentId = Number(userinfo?.user?.id ?? 0);

    if (!studentId || !quizid) {
      setError("Missing quiz or student ID.");
      return;
    }

    fetchStudentResult(studentId, quizid);
  }, []);

  const fetchStudentResult = async (studentId: number, quizid: number) => {
    try {
      console.log(`Fetching result for student ${studentId},quiz${quizid}`);

      // ✅ Use this if backend uses PATH parameters
      const response = await api.get<StudentResult>(
        `/api/student-result/${studentId}/${quizid}`
      );

      // ❌ OR use this if backend uses QUERY parameters:
      // const response = await api.get<StudentResult>(
      //   `/api/student-result?student_id=${studentId}&quiz_id=${quizid}`
      // );

      setSresult(response.data);
      console.log("✅ Result fetched:", response.data);
      }catch (err: any){
      console.error("❌ Failed to fetch student result:", err.response?.data || err.message);
      setError("Failed while fetching student result. Please check the server route.");
     }
  };

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-4" role="alert">
        {error}
      </div>
    );
  }

  if (!sresult){
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 col-lg-4 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading results...</p>
        </div>
      </div>
    );
  }

  return(
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-header bg-light text-dark">
            <h4 className="mb-0">Quiz Result</h4>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Total Marks Obtained:</strong> {sresult.total_marks_obtained}
              </li>
              <li className="list-group-item">
                <strong>Total Possible Marks:</strong> {sresult.total_possible_marks}
              </li>
              <li className="list-group-item">
                <strong>Percentage:</strong>{sresult.percentage}%
              </li>
              <li className="list-group-item">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge bg-${
                    sresult.status === "Pass" ? "success" : "danger"
                  }`}
                >
                  {sresult.status}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sresult;

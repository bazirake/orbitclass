import React, { useState } from 'react';
import "../components/report.css";
import { StudentReports } from '../Services/Objects';
import { api } from '../Services/api';

interface Subject {
   name: string;
   max: number;
   obtained: number;
   grade: string;
}

 interface StudentReport {
   studentNumber:string;
   name:string;
   subjects:Subject[];
}

// Mock database (replace with API call later)
const mockStudentData: Record<string, StudentReport> ={
  "1001": {
    studentNumber: "1001",
    name: "Alice Johnson",
    subjects: [
      { name: 'Reading and Writing', max: 100, obtained: 88, grade: 'A' },
      { name: 'Grammar', max: 100, obtained: 92, grade: 'A' },
      { name: 'Math', max: 100, obtained: 78, grade: 'B' },
      { name: 'Science', max: 100, obtained: 85, grade: 'A' },
      { name: 'Social Studies', max: 100, obtained: 90, grade: 'A' },
      { name: 'Music', max: 50, obtained: 45, grade: 'A' },
      { name: 'Arts', max: 50, obtained: 48, grade: 'A' },
      { name: 'Projects/Activities', max: 50, obtained: 42, grade: 'B' },
    ]
  },
  "1002": {
    studentNumber: "1002",
    name: "Bob Smith",
    subjects: [
      { name: 'Reading and Writing', max: 100, obtained: 75, grade: 'B' },
      { name: 'Grammar', max: 100, obtained: 80, grade: 'B' },
      { name: 'Math', max: 100, obtained: 95, grade: 'A' },
      { name: 'Science', max: 100, obtained: 88, grade: 'A' },
      { name: 'Social Studies', max: 100, obtained: 82, grade: 'B' },
      { name: 'Music', max: 50, obtained: 40, grade: 'B' },
      { name: 'Arts', max: 50, obtained: 45, grade: 'A' },
      { name: 'Projects/Activities', max: 50, obtained: 48, grade: 'A' },
    ]
  }
};

function Report() {
  const [studentNumber, setStudentNumber] = useState("");
  const [report, setReport] = useState<StudentReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<StudentReports | null>(null);

  const fetchReport = () => {
    setError(null);
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const data = mockStudentData[studentNumber];
      if (data) {
        setReport(data);
        setError(null);
      } else {
        setError("Student not found. Try 1001 or 1002.");
        setReport(null);
      }
      setLoading(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentNumber.trim()) {
     fetchReports(studentNumber.trim())
    }
  };

  // Calculate totals if report exists
  const totalMax = report ? report.subjects.reduce((sum, s) => sum + s.max, 0) : 0;
  const totalObtained = report ? report.subjects.reduce((sum, s) => sum + s.obtained, 0) : 0;
  const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : "0.00";
  const overallGrade = getGradeFromPercentage(Number(percentage));

  function getGradeFromPercentage(percent: number): string {
    if (percent >= 90) return 'A';
    if (percent >= 80) return 'B';
    if (percent >= 70) return 'C';
    if (percent >= 60) return 'D';
    if (percent >= 50) return 'E';
    return 'F';
  }



   // ✅ Fetch single quiz data
    const fetchReports =async (studentNumber:any) => {
      try {
       setError(null);
       setLoading(true);

    // Simulate API delay
    setTimeout( async () => {
     const response = await api.get<StudentReports>(
          `/api/student/performance/${studentNumber}`
        );
      if (response.data) {
        setReports(response.data);
        setError(null);
      } else {
        setError("Student not found. Try 1001 or 1002.");
        setReports(null);
      }
      setLoading(false);
    }, 800);

    
      } catch (err: any) {
        console.error("❌ Failed to fetch quiz:", err.response?.data || err.message);
        setError("Failed to load quiz. Please try again later.");
      }
    };

  return (
    <div className="container py-5">
      {/* Input Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3 align-items-center">
            <div className="col-md-8">
              <label htmlFor="studentNumber" className="form-label fw-bold">
                Enter Student Number:
              </label>
              <input
                type="text"
                id="studentNumber"
                className="form-control form-control-lg"
                placeholder="e.g:1234567"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Loading...
                  </>
                ) : (
                  "Fetch Report"
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Report Card - Only show if report is loaded */}
      {reports && (
        <div className="card shadow-lg border-0">
          <div className="card-body p-5">
            <h2 className="text-center mb-4 fw-bold text-primary">Student Report Card</h2>

            {/* Student Info */}
            <div className="row mb-4">
              <div className="col-md-6">
                <p className="mb-1"><strong>Name:</strong> {reports?.student_name}</p>
                <p className="mb-1"><strong>Grade:</strong> {reports?.overall_grade}</p>
                <p className="mb-1"><strong>Student No:</strong> {reports?.STUDENTNUMBER}</p>
              </div>
              <div className="col-md-6 text-md-end">
                <p className="mb-1"><strong>Academic Year:</strong> 2024-2025</p>
                <p className="mb-1"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <hr className="my-4" />

            {/* Grade Scale */}
         
            <div className="row text-center mb-1 g-0">
              Si:
              {[
                { grade: 'A', label: 'Excellent', color: 'bg-success' },
                { grade: 'B', label: 'Very Good', color: 'bg-primary' },
                { grade: 'C', label: 'Average', color: 'bg-info' },
                { grade: 'D', label: 'Below Average', color: 'bg-warning' },
                { grade: 'E', label: 'Poor', color: 'bg-danger' },
                { grade: 'F', label: 'No Effort', color: 'bg-secondary' },
              ].map((g) => (
                <div className="col" key={g.grade}>
                  <span className={`badge ${g.color} fs-6`}>{g.grade} - {g.label}</span>
                </div>
              ))}
            </div>
            
               <div className="row text-center mb-1 g-0">
                Gi:
              {[
                { grade: 'A', label: 'Excellent', color: 'bg-success' },
                { grade: 'B', label: 'Very Good', color: 'bg-primary' },
                { grade: 'C', label: 'Good', color: 'bg-info' },
                { grade: 'D', label: 'Fair ', color: 'bg-warning' },
                { grade: 'E', label: 'Pass', color: 'bg-danger' },
                { grade: 'F', label: 'Fail', color: 'bg-secondary' },
              ].map((g) => (
                <div className="col" key={g.grade}>
                  <span className={`badge ${g.color} fs-6`}>{g.grade} - {g.label}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            {/* Subjects Table */}
            <h5 className="mb-3">Performance Summary</h5>
            <div className="table-responsive">
              <table className="table table-bordered align-middle text-center">
                <thead className="table-primary">
                  <tr>
                    <th scope="col" className="text-start">Subject</th>
                    <th scope="col">Max Marks</th>
                    <th scope="col">Obtained</th>
                    <th scope="col">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {reports?.subjects?.map((subject, index) => (
                    <tr key={index}>
                      <td className="text-start fw-medium">{subject.course}</td>
                      <td>{subject?.max_marks}</td>
                      <td><strong>{subject?.obtained_marks}</strong></td>
                      <td>
                        <span
                          className={`badge ${
                            subject.overall_grade === 'A' ? 'bg-success':
                            subject.overall_grade === 'B' ? 'bg-primary':
                            subject.overall_grade === 'C' ? 'bg-info':
                            subject.overall_grade === 'D' ? 'bg-warning':
                            subject.overall_grade === 'E' ? 'bg-danger':
                            'bg-secondary'
                          }`}
                        >
                          {subject?.overall_grade}
                        </span>
                      </td>
                    </tr>
                  ))}

                  <tr className="table-info fw-bold">
                    <td className="text-start">Total</td>
                    <td>{reports?.grand_total_marks}</td>
                    <td>{reports?.total_obtained_marks}</td>
                    <td>
                         <span
                          className={`badge ${
                            reports.overall_grade === 'A' ? 'bg-success':
                            reports.overall_grade === 'B' ? 'bg-primary':
                            reports.overall_grade === 'C' ? 'bg-info':
                            reports.overall_grade === 'D' ? 'bg-warning':
                            reports.overall_grade === 'E' ? 'bg-danger':
                            'bg-secondary'
                          }`}
                        >{reports?.overall_grade}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Percentage */}
  
            <div className="text-center mt-4 p-3 bg-light rounded border">
              <h5 className="mb-0">
                Overall Percentage: <strong className="text-primary">{reports?.overall_average}%</strong>
              </h5>
            </div>

            {/* Signatures */}
            <div className="row mt-5">
              <div className="col-6">
                <p className="mb-1">_________________________</p>
                <p className="text-muted small">Parent/Guardian Signature</p>
              </div>
              <div className="col-6 text-end">
                <p className="mb-1">_________________________</p>
                <p className="text-muted small">Lecturer's Signature</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Button - Only show when report is loaded */}
      {report && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary btn-lg" onClick={() => window.print()}>
            Print Report Card
          </button>
        </div>
      )}
    </div>
  );
}

export default Report;
import React, { useState, useRef, useEffect } from 'react';
import "../components/report.css";
import { StudentReports } from '../Services/Objects';
import { api } from '../Services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNotify } from './NotifyProvider';

interface Subject {
  name: string;
  max: number;
  obtained: number;
  grade: string;
}

interface StudentReport {
  studentNumber: string;
  name: string;
  subjects: Subject[];
}

function Report() {
  const [studentNumber, setStudentNumber] = useState("");
  const [report, setReport] = useState<StudentReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<StudentReports | null>(null);

  // Ref for PDF capture

     const { visitReport } = useNotify();
      useEffect(() => {
      visitReport("reports"); // Emit event when page is visited
    }, []);
  
  const reportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentNumber.trim()) {
      fetchReports(studentNumber.trim());
    }
  };

  // Fetch report from API
  const fetchReports = async (studentNumber: any) => {
    try {
      setError(null);
      setLoading(true);

      setTimeout(async () => {
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
      console.error("Failed to fetch report:", err.response?.data || err.message);
      setError("Failed to load report. Please try again later.");
      setLoading(false);
    }
  };

  // Download PDF Function
  const downloadPDF = async () => {
    if (!reportRef.current || !reports) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${reports.student_name.replace(/\s+/g, '_')}_Report_Card.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
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

      {/* Report Card */}
      {reports && (
        <>
          <div ref={reportRef} className="card shadow-lg border-0 mb-4">
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
                              subject.overall_grade === 'A' ? 'bg-success' :
                              subject.overall_grade === 'B' ? 'bg-primary' :
                              subject.overall_grade === 'C' ? 'bg-info' :
                              subject.overall_grade === 'D' ? 'bg-warning' :
                              subject.overall_grade === 'E' ? 'bg-danger' :
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
                            reports.overall_grade === 'A' ? 'bg-success' :
                            reports.overall_grade === 'B' ? 'bg-primary' :
                            reports.overall_grade === 'C' ? 'bg-info' :
                            reports.overall_grade === 'D' ? 'bg-warning' :
                            reports.overall_grade === 'E' ? 'bg-danger' :
                            'bg-secondary'
                          }`}
                        >{reports?.overall_grade}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Overall Percentage */}
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

          {/* Print & Download Buttons */}
          <div className="text-center d-flex justify-content-center gap-3">
            
            <button
              className="btn btn-outline-primary btn-lg px-5"
              onClick={downloadPDF}
            >
             <i className="bi bi-download"></i> Downloadreport
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Report;
import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewAssessment() {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<any | null>(null);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await axios.get("http://localhost/api/assessments/list.php");
      setAssessments(res.data || []);
    } catch (err) {
      console.error("Failed to load assessments", err);
    } finally {
      setLoading(false);
    }
  };

  const loadAssessmentDetails = async (assessmentId: number) => {
    try {
      const res = await axios.get(
        `http://localhost/api/assessments/get.php?id=${assessmentId}`
      );
      setSelectedAssessment(res.data || null);
    } catch (err) {
      console.error("Failed to load assessment details", err);
    }
  };

  return (
    <div className="container mt-3">
      <h5 className="mb-3">Available Assessments</h5>

      {/* Loading State */}
      {loading && <p>Loading assessments...</p>}

      {/* No assessments */}
      {!loading && assessments.length === 0 && (
        <div className="alert alert-info text-center">
          No assessments found.
        </div>
      )}

      {/* Assessment List */}
      <div className="row">
        {assessments.map((a, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{a.title}</h5>
                <p className="text-muted">{a.description}</p>

                <p className="mb-1">
                  <strong>Total Marks:</strong> {a.total_marks}
                </p>
                <p className="mb-1">
                  <strong>Deadline:</strong>{" "}
                  {a.deadline ? new Date(a.deadline).toLocaleString() : "N/A"}
                </p>

                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => loadAssessmentDetails(a.id)}
                >
                  View Questions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assessment Questions Modal */}
      {selectedAssessment && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedAssessment.title} – Questions
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedAssessment(null)}
                ></button>
              </div>

              <div className="modal-body">
                {selectedAssessment.questions?.length > 0 ? (
                  selectedAssessment.questions.map((q: any, qIndex: number) => (
                    <div key={qIndex} className="border rounded p-3 mb-3">
                      <h6>
                        <strong>Question {qIndex + 1}:</strong> {q.question}
                      </h6>
                      <p>
                        <strong>Marks:</strong> {q.marks}
                      </p>

                      <ul className="list-group">
                        {q.options.map((op: any, oIndex: number) => (
                          <li
                            key={oIndex}
                            className={`list-group-item ${
                              op.isCorrect ? "list-group-item-success" : ""
                            }`}
                          >
                            {op.text}
                            {op.isCorrect && (
                              <span className="badge bg-success ms-2">
                                Correct
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No questions available.</p>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedAssessment(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Background dim */}
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
}

export default ViewAssessment;

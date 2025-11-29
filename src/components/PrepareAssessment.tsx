import React, { useState } from "react";
import axios from "axios";

function PrepareAssessment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [deadline, setDeadline] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      marks: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  ]);

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        marks: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  };

  // Add option to specific question
  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push({ text: "", isCorrect: false });
    setQuestions(updated);
  };

  // Set correct option
  const setCorrectOption = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.map((op, idx) => ({
      ...op,
      isCorrect: idx === oIndex,
    }));
    setQuestions(updated);
  };

  // Submit Assessment
  const submitAssessment = async () => {
    if (!title.trim()) {
      alert("Enter assessment title!");
      return;
    }

    try {
      const payload = {
        title,
        description,
        totalMarks,
        deadline,
        questions,
      };

      await axios.post("http://localhost/api/assessments/create.php", payload);

      alert("Assessment created successfully!");

      // Clear form
      setTitle("");
      setDescription("");
      setTotalMarks("");
      setDeadline("");
      setQuestions([
        {
          question: "",
          marks: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("Failed to create assessment");
    }
  };

  return (
    <div className="container">
      <h5 className="mb-3">Create New Assessment</h5>

      {/* Basic Assessment Information */}
      <div className="mb-3">
        <label className="form-label">Assessment Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter assessment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Enter assessment description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Total Marks</label>
          <input
            type="number"
            className="form-control"
            placeholder="100"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Deadline</label>
          <input
            type="datetime-local"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
      </div>

      <hr />

      {/* Questions Section */}
      <h5>Questions</h5>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="border rounded p-3 mb-3">
          <label className="form-label">Question {qIndex + 1}</label>
          <textarea
            className="form-control mb-2"
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => {
              const updated = [...questions];
              updated[qIndex].question = e.target.value;
              setQuestions(updated);
            }}
          ></textarea>

          <label className="form-label">Marks</label>
          <input
            type="number"
            className="form-control mb-3"
            value={q.marks}
            onChange={(e) => {
              const updated = [...questions];
              updated[qIndex].marks = e.target.value;
              setQuestions(updated);
            }}
          />

          <h6>Options</h6>

          {q.options.map((op, oIndex) => (
            <div key={oIndex} className="input-group mb-2">
              <div className="input-group-text">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={op.isCorrect}
                  onChange={() => setCorrectOption(qIndex, oIndex)}
                />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder={`Option ${oIndex + 1}`}
                value={op.text}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[qIndex].options[oIndex].text = e.target.value;
                  setQuestions(updated);
                }}
              />
            </div>
          ))}

          {/* Add Option Button */}
          <button
            className="btn btn-secondary btn-sm mt-2"
            onClick={() => addOption(qIndex)}
          >
            + Add Option
          </button>
        </div>
      ))}

      {/* Add Question Button */}
      <button className="btn btn-primary mb-3" onClick={addQuestion}>
        + Add Question
      </button>

      <hr />

      {/* Submit Assessment */}
      <button className="btn btn-success w-100" onClick={submitAssessment}>
        Submit Assessment
      </button>
    </div>
  );
}

export default PrepareAssessment;

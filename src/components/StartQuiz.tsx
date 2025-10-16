import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { api } from '../Services/api';
import { QuizWithQuestions } from '../Services/Objects';
import Countdown from './Countdown';

function StartQuiz() {
  const { deptid, levid } = useParams<{ deptid: string; levid: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [duration, setDuration] = useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const userinfo = JSON.parse(localStorage.getItem('auth') || '{}');

  useEffect(() => {
    if (!deptid || !levid) {
      setError('Invalid department or level ID.');
      return;
    }
    fetchQuiz(Number(deptid), Number(levid));
  }, [deptid, levid]);

  const fetchQuiz = async (department_id: number, level_id: number) => {
    try {
      setError(null);
      const response = await api.get<QuizWithQuestions[]>(`/api/quizzes/${department_id}/${level_id}`);
      if (response.data.length === 0) {
        setError('No quiz found for the selected department and level.');
        return;
      }
      const selectedQuiz = response.data[0]; // Take the first quiz
      setQuiz(selectedQuiz);
      localStorage.setItem('quizid', selectedQuiz.quiz_id.toString());
      fetchDuration(selectedQuiz.quiz_id);
      console.log('Quiz fetched:', selectedQuiz);
    } catch (err: any) {
      console.error('Failed to fetch quiz:', err.response?.data || err.message);
      setError('Failed to load quiz. Please try again.');
    }
  };

  const fetchDuration = async (quizId: number) => {
    try {
      const response = await api.get<{ duration: number }>(`/api/quiz/${quizId}/duration`);
      const dur = Number(response.data.duration);
      setDuration(dur);
      localStorage.setItem('duration', dur.toString());
      console.log('Countdown Duration:', dur);
    } catch (err: any) {
      console.error('Error fetching duration:', err.response?.data || err.message);
      setError('Failed to load quiz duration.');
    }
  };

  const handleSelect = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    try {
      const quizId = Number(localStorage.getItem('quizid'));
      const payload = Object.entries(answers).map(([qId, optId]) => ({
        student_id: Number(userinfo?.user?.id),
        question_id: Number(qId),
        option_id: optId,
        quiz_id: quizId,
      }));
      const response = await api.post('/api/student-answers', payload);
      console.log('Submit response:', response.data);
      alert('Answers submitted successfully!');
      navigate('/quizresult');
    } catch (err: any) {
      console.error('Error submitting answers:', err.response?.data || err.message);
      const errorMessage = err.response?.status === 409 ? err.response.data.error : 'Error submitting answers.';
      alert(errorMessage);
    }
  };

  const handleComplete = async () => {
    setIsTimeUp(true);
    const quizId = Number(localStorage.getItem('quizid'));
    if (quizId) {
      await updateDurationQuiz(quizId);
      await handleSubmit(); // Auto-submit when time is up
    }
  };

  const updateDurationQuiz = async (quizId: number) => {
    try {
      await api.put(`/api/uquiz/${quizId}/duration`);
      console.log('Quiz duration updated');
    } catch (err: any) {
      console.error('Error updating quiz duration:', err.response?.data || err.message);
    }
  };

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-header text-dark d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <strong>
                  {quiz.quiz_title} <span className="ms-3">{quiz.total_marks} Marks</span>
                </strong>
              </h5>
              <span>
                Time Remaining:{' '}
                {duration !== null ? (
                  <Countdown initialSeconds={duration} onComplete={handleComplete} />
                ) : (
                  <span>Loading...</span>
                )}
              </span>
            </div>
            <div className="card-body">
              <form
                id="quizForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="needs-validation"
              >
                <div className="mb-4">
                  {quiz.questions.map((que, index) => (
                    <div key={que.question_id} className="mb-3">
                      <h5>
                        {index + 1}. {que.question_text} <span className="ms-2">/{que.marks}</span>
                      </h5>
                      {que.options.map((opt) => (
                        <div className="form-check" key={opt.option_id}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`q-${que.question_id}`}
                            value={opt.option_id}
                            checked={answers[que.question_id] === opt.option_id}
                            onChange={() => handleSelect(que.question_id, opt.option_id)}
                            disabled={isTimeUp}
                          />
                          <label className="form-check-label">{opt.option_text}</label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {!isTimeUp && (
                  <div className="d-flex mt-3">
                    <button type="submit" className="btn btn-primary" ref={submitButtonRef}>
                      Submit Quiz
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartQuiz;
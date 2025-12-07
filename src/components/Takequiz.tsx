import React, { useEffect, useState } from 'react';
import { api } from '../Services/api';
import { formatLocalDate, Quizt, QuizWithQuestions } from '../Services/Objects';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotify } from './NotifyProvider';

function Takequiz() {
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null);
  const [quizt, setQuizt] = useState<Quizt | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userinfo = JSON.parse(localStorage.getItem('auth')!);
  const { takequizReport } = useNotify();

  useEffect(() => {
    takequizReport('takequiz');
    fetchQuizt();
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await api.get<QuizWithQuestions>(
        `/api/quizzes/${userinfo.user.department_id}/${userinfo.user.level_id}`
      );
      setQuiz(response.data);
    } catch (err) {
      console.error('Failed to fetch quiz', err);
    }
  };

  const fetchQuizt = async () => {
    try {
      const response = await api.get<Quizt>(
        `/api/quiz/latest/?deptid=${userinfo.user.department_id}&level_id=${userinfo.user.level_id}`
      );

      const quizData = {
        ...response.data,
        deadline:formatLocalDate(response.data.deadline) // formatted with AM/PM
      };

      setQuizt(quizData);
    } catch (err) {
      console.error('Failed to fetch quiz', err);
    }
  };

  const startQuiz = (deptid: number, levelid: number) => {
    navigate(`${location.pathname}/${deptid}/${levelid}`);
  };

  // Check if quiz is still active (deadline > current date-time)
  const isQuizActive = (deadline: string | undefined): boolean => {
    if (!deadline) return false;

   
    const deadlineDate = new Date(deadline.replace(/-/g, '/')); 
  
    const now = new Date();

    return deadlineDate.getTime() > now.getTime();
  };

  // Render nothing if quiz is expired
  if (!quizt || !isQuizActive(quizt.deadline)) {
    return (
      <div className="container">
        <p className="text-center fw-bold mt-5">
          {quizt ? `Quiz expired on ${quizt.deadline}` : 'Loading quiz...'}
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-header bg-light text-dark">
              <h4 className="mb-0">Quiz Instructions</h4>
            </div>
            <div className="card-body">
              {quiz ? (
                <>
                  <p className="lead">
                    Dear <strong className="text-capitalize">{userinfo.user.fullname}</strong>,
                    welcome to this <strong>{quiz.quiz_title}</strong> — {quiz.quiz_description}.
                  </p>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                      <strong>Time Limit:</strong> You have a few minutes to complete the quiz.
                    </li>
                    <li className="list-group-item">
                      <strong>Questions:</strong> <span className="fw-bold">multiple-choice questions</span>.
                    </li>
                    <li className="list-group-item">
                      <strong>Scoring:</strong> Each correct answer is worth <span className="fw-bold">points</span>.
                    </li>
                    <li className="list-group-item">
                      <strong>Deadline:</strong> <strong>{quizt.deadline}</strong>
                    </li>
                    <li className="list-group-item">
                      <strong>Submission:</strong> Click <span className="fw-bold">"Submit Quiz"</span>.
                    </li>
                    <li className="list-group-item">
                      <strong>Technical Requirements:</strong> Stable internet. Don't refresh during quiz.
                    </li>
                  </ul>
                  <div className="alert alert-warning" role="alert">
                    <strong>Note:</strong> Once you start the quiz, the timer will begin, and you cannot pause it.
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        startQuiz(userinfo.user.department_id, userinfo.user.level_id)
                      }
                    >
                      Start Quiz
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center text-muted">Loading latest quiz...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Takequiz;

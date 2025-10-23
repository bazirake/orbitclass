import React, { useEffect, useState } from 'react';
import { api } from '../Services/api';
import { formatLocalDate, formatLocalTime, Quizt, QuizWithQuestions } from '../Services/Objects';
import { useLocation, useNavigate } from 'react-router-dom';

function Takequiz() {
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null);
  const [quizt, setQuizt] = useState<Quizt | null>(null);
  const navigate = useNavigate();
  const userinfo = JSON.parse(localStorage.getItem('auth')!);
  const location = useLocation();

  useEffect(() => {
    fetchQuizt();
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await api.get<QuizWithQuestions>(
        `/api/quizzes/${userinfo.user.department_id}/${userinfo.user.level_id}`
      );
      setQuiz(response.data);
      console.log("Fetched latest quiz:", response.data.quiz_description);
    } catch (err) {
      console.error("Failed to fetch quiz", err);
    }
  };

  const fetchQuizt = async () => {
    try {
      const response = await api.get<Quizt>(
        `/api/quiz/latest/?deptid=${userinfo.user.department_id}&level_id=${userinfo.user.level_id}`
      );

      const quizData = {
        ...response.data,
        deadline: formatLocalDate(response.data.deadline), // YYYY-MM-DD
        at: formatLocalTime(response.data.at)// 👈 HH:MM:SS format
      };

      setQuizt(quizData);
      console.log("Fetched latest quiz:", quizData);
    } catch (err) {
      console.error("Failed to fetch quiz", err);
    }
  };

  const startQuiz = (deptid: number, levelid: number) => {
    navigate(`${location.pathname}/${deptid}/${levelid}`);
  };

  // ✅ FIXED: Date comparison (YYYY-MM-DD)
  const isQuizActive = (deadline: string | undefined): boolean => {
    if (!deadline) return false;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return deadline >= today;
  };

  // // ✅ NEW: Time comparison (HH:MM:SS)
  // const isTimeActive = (time: string | undefined): boolean => {
  //   if (!time) return false;
  //   const currentTime = new Date().toLocaleTimeString('en-US', {
  //     hour12: false,
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit'
  //   }); // HH:MM:SS format
  //   return time >= currentTime;
  // };

  // 👈 Replace YOUR isTimeActive with this:
const isTimeActive = (time: string | undefined): boolean => {
  if (!time) return false;
  
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', {
    timeZone: 'Africa/Kigali', // 🇷🇼 Rwanda (CAT = UTC+3)
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  return time >= currentTime;
};
  return (
    <div className="container">
      {quizt && isQuizActive(quizt.deadline) && isTimeActive(quizt.at) ? (
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
                        <strong>Available Time:</strong>{' '}
                        <strong>{quizt.at}</strong>
                      </li>
                      <li className="list-group-item">
                        <strong>Deadline:</strong>{' '}
                        <strong>{quizt.deadline}</strong>
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
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-12">
            <p className="text-center fw-bold">
              {quizt && !isQuizActive(quizt.deadline) 
                ? `Quiz expired on ${quizt.deadline}` 
                : quizt && !isTimeActive(quizt.at)
                ? `Quiz available from ${quizt.at}` 
                : 'No quiz or assignment is available'
              }
            </p> 
          </div>
        </div>
      )}
    </div>
  );
}

export default Takequiz;
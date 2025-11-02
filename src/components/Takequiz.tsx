import React, { useEffect, useState } from 'react';
import { api } from '../Services/api';
import { formatLocalDate, formatLocalTime, Quizt, QuizWithQuestions } from '../Services/Objects';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotify } from './NotifyProvider';

function Takequiz() {
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null);
  const [quizt, setQuizt] = useState<Quizt | null>(null);
  const navigate = useNavigate();
  const userinfo = JSON.parse(localStorage.getItem('auth')!);
  const location = useLocation();
  const { takequizReport } =useNotify();

  useEffect(() => {
     //isTimeActive("08:30")
   //   alert(isBeforeDeadline("08:30"));
   takequizReport("takequiz"); // Emit event when page is visited
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
        at:response.data.at // HH:MM:SS format
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

  const isQuizActive = (deadline: string | undefined): boolean => {
     if(!deadline) return false;
     const now = new Date();
     const dateString = now.toLocaleDateString('en-US', {
      timeZone: 'Africa/Kigali',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const [month, day, year] = dateString.split('/');
    const today = `${year}-${month}-${day}`; // YYYY-MM-DD
    return deadline >= today;
  };

const isBeforeDeadline = (deadline: string | undefined): boolean => {
  if (!deadline) return false;

  // Get current Kigali time in "HH:mm"
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Kigali',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  const currentTimeStr = formatter.format(now); // e.g. "14:25"

  // Convert both to total minutes since midnight
  const [currHour, currMin] = currentTimeStr.split(':').map(Number);
  const [deadlineHour, deadlineMin] = deadline.split(':').map(Number);

  if (
    isNaN(currHour) || isNaN(currMin) ||
    isNaN(deadlineHour) || isNaN(deadlineMin)
  ) return false;

  const currentMinutes = currHour * 60 + currMin;
  const deadlineMinutes = deadlineHour * 60 + deadlineMin;

  // ✅ Return true if current time <= deadline
  return currentMinutes <= deadlineMinutes;
};



  return (
    <div className="container">
      {quizt && isQuizActive(quizt.deadline) && isBeforeDeadline(quizt.at) ? (
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
                   ):(
                  <p className="text-center text-muted">Loading latest quiz...</p>
                  )}
              </div>
            </div>
          </div>
        </div>
        ):(
        <div className="row justify-content-center">
          <div className="col-md-12">
            <p className="text-center fw-bold">
             {
               quizt && `Quiz expired on ${quizt.deadline} at ${quizt.at}`
             }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Takequiz;
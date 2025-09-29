
import React, { useEffect, useState } from 'react'
import { api } from '../Services/api';
import { QuizWithQuestions, QuizzesApiResponse, getApiLevel } from '../Services/Objects';

function Viewquiz() {
 const[quiz,setQuiz]=useState<QuizWithQuestions[]>([])


   useEffect(()=>{
    fetchQuiz()
     },[])
           const fetchQuiz = async () => {
                 //etIsLoading(true);
                try{
                     const response = await api.get<QuizzesApiResponse>(
                     "/api/quizzes/3/2" // replace with your API URL
                    );
                    setQuiz(response.data);//set API array to state
                    console.log("mbega byiza",response.data[0].quiz_description);
                  }catch (err) {
                  // setError("Failed to fetch departments");
                 } finally {
                   //setIsLoading(false);
                 }
               };

  return (
  
  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Quiz Instructions</h3>
          </div>
          <div className="card-body">
            <p className="lead">Welcome to the Quiz! Please read the instructions below carefully before starting.</p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">
                <strong>Time Limit:</strong> You have <span className="fw-bold">30 minutes</span> to complete the quiz.
              </li>
              <li className="list-group-item">
                <strong>Questions:</strong> The quiz consists of <span className="fw-bold">10 multiple-choice questions</span>.
              </li>
              <li className="list-group-item">
                <strong>Scoring:</strong> Each correct answer is worth <span className="fw-bold">10 points</span>. There is no penalty for incorrect answers.
              </li>
              <li className="list-group-item">
                <strong>Navigation:</strong> Use the "Next" and "Previous" buttons to move between questions. You can revisit and change your answers before submitting.
              </li>
              <li className="list-group-item">
                <strong>Submission:</strong> Click the <span className="fw-bold">"Submit Quiz"</span> button when you are ready to finish. Ensure all questions are answered.
              </li>
              <li className="list-group-item">
                <strong>Technical Requirements:</strong> Ensure a stable internet connection. Do not refresh the page during the quiz to avoid losing progress.
              </li>
            </ul>
            <div className="alert alert-warning" role="alert">
              <strong>Note:</strong> Once you start the quiz, the timer will begin, and you cannot pause it.
            </div>
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-success btn-lg">Start Quiz</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )


          
}

export default Viewquiz

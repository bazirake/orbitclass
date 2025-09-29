import React, { useEffect, useState } from 'react'
import { api } from '../Services/api';
import { QuizWithQuestions, QuizzesApiResponse } from '../Services/Objects';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function Takequiz() {
     const[quiz,setQuiz]=useState<QuizWithQuestions[]>([])
     const navigate=useNavigate();
     const userinfo=JSON.parse(localStorage.getItem('auth')!);
     useEffect(()=>{
        //console.log("quiz",userinfo)
        fetchQuiz();
         },[])
              const fetchQuiz = async () => {
                   //etIsLoading(true);
                  try{
                    const response = await api.get<QuizzesApiResponse>(
                        `/api/quizzes/${userinfo.user.department_id}/${userinfo.user.level_id}` // replace with your API URL
                      );
                     setQuiz(response.data);//set API array to state
                        console.log("mbega byiza",response.data[0].quiz_description);
                      }catch (err) {
                      // setError("Failed to fetch departments");
                     } finally {
                       //setIsLoading(false);
                     }
                   };

                const location = useLocation(); // hook gives location object
              //alert(location.pathname)

    const startQuiz =(id:any,leid:any) => {
   // alert(id+','+leid);                                     
    navigate(`${location.pathname}/${id}/${leid}`);
  };
 
  return (
   <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-12 ">
        <div className="card shadow">
          <div className="card-header bg-light text-dark">
            <h4 className="mb-0">Quiz Instructions</h4>
          </div>
          <div className="card-body">
            <p className="lead">
                 
             Dear <strong className='text-capitalize'>{userinfo.user.fullname},</strong> Welcome to this
                   {
                    quiz.map((item)=>
                    <strong>{item.quiz_title}-{item.quiz_description}</strong>
                    )
                 } Please read the instructions below carefully before starting.</p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">
                <strong>Time Limit:</strong> You have <span className="fw-bold">few minutes</span> to complete the quiz.
              </li>
              <li className="list-group-item">
                <strong>Questions:</strong> The quiz consists of <span className="fw-bold">multiple-choice questions</span>.
              </li>
              <li className="list-group-item">
                <strong>Scoring:</strong> Each correct answer is worth <span className="fw-bold">points</span>. There is no penalty for incorrect answers.
              </li>
              <li className="list-group-item">
                <strong>Dealine:</strong>    
                    {
                    quiz.map((item)=>
                    <strong>{ new Date(item.deadline).toLocaleDateString()}</strong>
                    )
                  }
              </li>
              <li className="list-group-item">
                <strong>Submission:</strong> Click the <span className="fw-bold">"Submit Quiz"</span> button when you are ready to finish. Ensure all questions are answered.
              </li>
              <li className="list-group-item">
                <strong>Technical Requirements:</strong> Ensure a stable internet connection. Do not refresh the page during the quiz to avoid losing progress.
              </li>
            </ul>
          <div className="alert alert-warning" role="alert">
          <strong>Note:</strong>Once you start the quiz, the timer will begin, and you cannot pause it.
        </div>
        <div className="d-flex align-items-center justify-content-center ">
          {quiz&&<button type="button" className="btn btn-primary" onClick={()=>startQuiz(userinfo.user.department_id,userinfo.user.level_id)}>Start Quiz </button>}
        </div>
        </div>
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default Takequiz
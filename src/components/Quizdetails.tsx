import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { formatLocalDate, QuizWithQuestions } from '../Services/Objects';
import { api } from '../Services/api';

function Quizdetails() {
  const{qid,qt,qd,qma,qat}=useParams();
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [duration, setDuration] = useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate=useNavigate();

    useEffect(() => {
      fetchQuiz(Number(qid));
    }, []);

    const fetchQuiz = async (qid:any) => {
       try{
         setError(null);
         //Expecting a single quiz object, not an array
         const response = await api.get<QuizWithQuestions>(
           `/api/quizzes/${qid}`
         );
         const selectedQuiz = response.data;
         setQuiz(selectedQuiz);
        }catch (err: any){
         console.error("Failed to fetch quiz:", err.response?.data || err.message);
         setError("Failed to load quiz. Please try again later.");
       }
     };

      function back() {
        navigate("/main/quiz");
      }

     
    return(
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow">
             <div className='card-header text-dark'>
                <div className='d-flex justify-content-between'>
               <h5 style={{fontSize:'16px'}} className=" mb-2">Quiz details for <strong>{qt}</strong> department of <strong>{qd}</strong>/{qma} Marks Created At &nbsp; {qat}</h5>
               <button onClick={back} className='btn btn-primary'><i className="bi bi-arrow-left"></i>back</button>
                </div>
               
             </div>
             <div className="card-body">

                {quiz ? (
         <form>
        {quiz.questions.map((que,index)=>(
        <div key={que.question_id} className="mb-4">
        <h5 style={{fontSize:'15px'}}>
          {index + 1}. {que.question_text}
        </h5>
    <ol type="i" className="ms-4">
      {que.options.map((opt) => (
      <li key={opt.option_id} className="mb-1">
      {opt.option_text}
    </li>
  ))}
</ol>
      </div>
    ))}
  </form>
) : (
  <p>Loading quiz details...</p>
)}
             </div>
             </div>
             </div>
          </div>
          </div>
  )
}

export default Quizdetails

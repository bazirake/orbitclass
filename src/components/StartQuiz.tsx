import React,{useEffect,useRef,useState } from 'react'
import {useLocation,useNavigate,useParams} from 'react-router-dom'
import {api} from '../Services/api';
import {Department,QuizWithQuestions,QuizzesApiResponse,StudentResult } from '../Services/Objects';
import Countdown from './Countdown';

function StartQuiz() {
    const{deptid}=useParams(); // quizid matches :quizid in route
    const{levid}=useParams(); 
    const Navigate=useNavigate();
    const location=useLocation();
    const[quiz,setQuiz]=useState<QuizWithQuestions[]>([]);
    const[answers,setAnswers]=React.useState<{[key:number]:number}>({});
    const[duration,setDuration]=useState<number>(0);
    const dureid=localStorage.getItem('duration')!;
    const submitButtonRef = useRef<HTMLButtonElement|null>(null);
    //key=question_id,value=option_id chosen
    useEffect(()=>{
     // alert(dureid);
     // alert(deptid)
    fetchQuiz(Number(deptid),Number(levid));
      //alert("my God")  
      const quizIdStr=localStorage.getItem('quizid');
      if(!quizIdStr) return; //nothing stored
      const quizId =Number(quizIdStr);
      fetchDuration(quizId);
      //alert("Hello!!!"+quizId)
      },[duration]);

     const navigate =useNavigate();
     const userinfo =JSON.parse(localStorage.getItem('auth')!);
     const fetchQuiz =async(deptid:number,levid:number)=>{
        try{
            const response =await api.get<QuizzesApiResponse>(
                              `/api/quizzes/${deptid}/${levid}`//replace with your API URL
              );
                //alert(duration)
               //alert(response.data[0].quiz_description)
               console.log("welcome",response.data[0].quiz_id);
               setQuiz(response.data);//set API array to state
               localStorage.setItem("quizid",response.data[0].quiz_id.toString())
               console.log("mbega",response.data[0].quiz_id);
               }catch(err){
               //setError("Failed to fetch departments");
               }finally{
                //setIsLoading(false);
               }
               };

         const handleSelect = (questionId:number,optionId:number) => {
             setAnswers(prev => ({...prev,[questionId]:optionId}));
            };
       const handleSubmit = async ()=>{
        try{
const quizIdStr=localStorage.getItem('quizid')??null;
        const payload = Object.entries(answers).map(([qId, optId]) => ({
         student_id:Number(userinfo.user.id), // from session
         question_id:Number(qId),
         option_id:optId as number,
         quiz_id:Number(quizIdStr)
         }));
      // ✅ Axios POST request
      const response = await api.post('/api/student-answers',payload);
      console.log(response.data);//server response
        alert('Answers submitted successfully!');
       // submitButtonRef.current?.click();
        Navigate(`Quizresult`);
        }catch (err:any) {
        if (err.response?.status === 409) {
         alert(err.response.data.error);
      }
       // console.error("Error details",error);
       // alert('Error submitting answers');
        }
        }

     const handleComplete =()=>{
       alert('Time is up!!')
        //handleSubmit();
       //submit quiz or do something else
      };
   //alert(deptid)

    const fetchDuration = async (quid:number) => {
      try {
        const response = await api.get(`/api/quiz/${quid}/duration`); // your server
       // setDuration(Number(response.data.duration));
        localStorage.setItem("duration",response.data.duration)
       // alert(Number(response.data.duration))
        //seconds from DB
        //alert('durationsss'+response.data.duration)
       // alert(response.data.duration)
        console.log("Countdown",response.data.duration)
      } catch (err) {
        console.error('Error fetching duration', err);
      }
    };
  return (
  <div className="container">
     <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card shadow">
          <div className="card-header text-dark d-flex justify-content-between align-items-center">
             <h5 className="mb-0">Quiz Questions for {quiz.map((item)=><strong>{item.quiz_title} &nbsp;&nbsp;&nbsp;/<span className='ml-3'>{item.total_marks} Marks</span></strong>)}</h5>
             <span>Time Remaining: <span id="timer">
              <Countdown initialSeconds={Number(dureid)} onComplete={handleComplete} />  
                </span></span>
          </div>
          <div className="card-body">
            <form id="quizForm" onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit();
            }}  className="needs-validation">
            <div className="mb-4">

    {quiz.map((item) =>
  item.questions.map((que, index) => (
    <div key={que.question_id}>
      <h5>
        {index + 1}.{que.question_text} &nbsp;&nbsp;/{que.marks}
      </h5>
      {que.options.map((opt)=>(
        <div className="form-check" key={opt.option_id}>
          <input
            className="form-check-input"
            type="radio"
            name={`q-${que.question_id}`} //✅ unique name per question
            value={opt.option_id}
            onChange={() => handleSelect(que.question_id,opt.option_id)} // ✅ track answers
          />
            <label className="form-check-label">{opt.option_text}</label>
            </div>
           ))}
        </div>
       ))
       )}
        </div>
        <div className="d-flex mt-3">
        <button type="submit" className="btn btn-primary" id="submitBtn">Submit Quiz</button>
        </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default StartQuiz
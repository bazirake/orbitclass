
import React, { useEffect, useState } from 'react'
import { api } from '../Services/api';
import { Departments, ApiResponsedepartments, Department, getApiLevel, Level, Semester, Instructor, Course, Day, TimetableType, CourseSchedule, Quiz, QuizSummary, QuizQuestion, Onequestion, QuestionOption } from '../Services/Objects';
import { error } from 'console';
   function Preparequiz() {
   const[department,setDepartment]=useState<Department[]>([]);
   const[levels,setLevel]=useState<Level[]>([]);
   const[semesterss,setSemester]=useState<Semester[]>();
   const[instructor,setInstructor]=useState<Instructor[]>();
   const[courses,setCourse]=useState<Course[]>();
   const[oneque,setOneque]=useState<Onequestion>();
   const[types,setType]=useState<TimetableType[]>()
   const[plan,setPlan]=useState({course_id:'',
    instructor_id:0,day_id:0,room:'',start_time:'',end_time:'',semester:'',academic_year:'',level_id:0,deptid:0,typeid:0})
    const[getmesstime,setMessagetime]=useState({message:'',quiz_id:0});
    const[getmess,setMessage]=useState('');
    const userinfo = JSON.parse(localStorage.getItem('auth')!);
    const oneq= Number(localStorage.getItem('questid')!);
    const [quize,setQuiz]=useState<Quiz>({quiz_title:'',quiz_description:'',
    department_id:0,level_id:0,course_id:0,prepared_by:userinfo.user.id,total_marks:0,duration:0,deadline:''})
    const[quizs,setQuizs]=useState<QuizSummary[]>();
    const[quizas,setQuizas]=useState<QuizQuestion>({quiz_id:0,question_text:'',marks:0});
    const[messageq,setMessageq]=useState({message:'',question_id:''});
    const[option,setOption]=useState<QuestionOption>({question_id:0,option_text:'',is_correct:false})
    const[optionres,setOptionres]=useState({message:'',option_id:0});
   useEffect(()=>{
    //alert(oneq);
     fetchDepartments();
     fetchLevel();
     fetchCourse();
    //const id=quizs?.map(({quiz})=>quiz)
     const ids = quizs?.map(({ quiz_id }) => quiz_id);
      fetchQuizid(ids);
    // alert(ids)
    fetchOneque(oneque?.question_id);
   },[quizs,oneque])
   const fetchDepartments = async () => {
    //etIsLoading(true);
     try{
        const response = await api.get<Department[]>(
               "/department" // replace with your API URL
      );
       setDepartment(response.data); // set API array to state
            console.log("table",response.data);
     }catch (err){
            // setError("Failed to fetch departments");
           } finally {
             //setIsLoading(false);
           }
         }
    const fetchQuizid = async (quiz:any) => {
         //etIsLoading(true);
         try{
             const response = await api.get<QuizSummary[]>(
               `/quizzes?quiz_id=${quiz}` // replace with your API URL
           );
          //alert(quid);

         // alert(response.data.quiz_id);
            setQuizs(response.data); // set API array to state
            console.log("getting quizes",response.data);
       }catch(err){
            // setError("Failed to fetch departments");
           } finally {
             //setIsLoading(false);
           }
         }

     const fetchCourse = async () => {
    //etIsLoading(true);
     try{
        const response = await api.get<Course[]>(
               "/api/courses" // replace with your API URL
      );
        setCourse(response.data); // set API array to state
            console.log("table",response.data);
     }catch (err){
            // setError("Failed to fetch departments");
           } finally {
             //setIsLoading(false);
           }
         }

         const fetchLevel = async () => {
               //etIsLoading(true);
              try{
                  const response = await api.get<getApiLevel>(
                   "/levels" // replace with your API URL
                );
                  setLevel(response.data.levels);//set API array to state
                  //console.log(levels);
               }catch (err) {
                // setError("Failed to fetch departments");
               } finally {
                 //setIsLoading(false);
               }
             };
              const fetchOneque =async(quid:any) => {
                   //etIsLoading(true);
                try{
                   const response = await api.get<Onequestion>(
                   `/quiz-questions/${quid}` // replace with your API URL
                );
                  setOneque(response.data);//set API array to state
                  //console.log(levels);
               }catch (err) {
                // setError("Failed to fetch departments");
               } finally {
                 //setIsLoading(false);
               }
             };

  return (
<div className="container mt-1">
  {getmesstime.message && <div className="alert alert-success alert-dismissible">
     <strong>{getmesstime.message}-{getmesstime.quiz_id}</strong> <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
     </div>
      }
    <form onSubmit={async (e)=>{
       e.preventDefault();
          await api.post("/preparequizze",quize)
          .then((data)=> {fetchQuizid(data.data.quiz_id);setMessagetime(data.data)}).catch((error)=>setMessagetime(error.message))
          //fetchQuizid(getmesstime.quiz_id);
        //setMessage(data.data.message) 
       //alert('Hello');
     }}>
          {/*Timetable Name*/}
        <fieldset className="border border-primary rounded p-3">
        <legend className="float-none w-auto px-2">Quiz info</legend>
       <div className="row mb-1">
        <div className="col-md-3">
          <label  className="form-label">Quiz/assignmentTitle</label>
          <input type="text" value={quize.quiz_title} className="form-control" id="subject" onChange={(e)=>setQuiz((prev)=>({...prev,quiz_title:e.target.value}))} placeholder="" required/>
        </div>
         <div className="col-md-3">
          <label  className="form-label">QuizDescription</label>
          <input type="text" value={quize.quiz_description} className="form-control" id="subject" onChange={(e)=>setQuiz((prev)=>({...prev,quiz_description:e.target.value}))} required/>
          <input type="text" value={quize.prepared_by} className="form-control" id="subject"  hidden/>
        </div>
         <div className="col-md-3">
           <label  className="form-label">TotalMarks</label>
           <input type="number"  className="form-control" id="subject" onChange={(e)=>setQuiz((prev)=>({...prev,total_marks:Number(e.target.value)}))} required/>
        </div>
  <div className="col-md-3">
    <label className="form-label">Department</label>
      <select className="form-select" id="subject" onChange={(e)=>setQuiz((prev)=>({...prev,department_id:Number(e.target.value)}))} required>
      <option value="">Choose dept...</option>
        {
        department.map((item)=>
        <option value={item.department_id}>{item.department_name}</option>
        )
        }
</select>
 </div>
        </div>    
<div className="row mb-3">
 <div className="col-md-3">
        <label className="form-label">Level</label>
          <select className="form-select" id="dayOfWeek" onChange={(e)=>setQuiz((prev)=>({...prev,level_id:Number(e.target.value)}))} required>
            <option value="">Choose...</option>
             {levels.map((item)=>
             <option value={item.level_id}>{item.description}</option>
            )
             }
        </select>
        </div>
         <div className="col-md-3">
          <label className="form-label">Subject</label>
       <select className="form-select"  id="subject" onChange={(e)=>setQuiz((prev)=>({...prev,course_id:Number(e.target.value)}))}>
    <option value="">Choose subject...</option>
    {courses?.map((item)=>
    <option value={item.course_id}>{item.course_name}</option>
   )}
  
</select>        
 </div>
        <div className="col-md-3">
          <label  className="form-label">Duration(seconds)</label>
          <input type="number" className="form-control" id="endTime" onChange={(e)=>setQuiz((prev)=>({...prev,duration:Number(e.target.value)}))} required/>
        </div>
         <div className="col-md-3">
          <label  className="form-label">Deadline</label>
          <input type="date" className="form-control" id="endTime" onChange={(e)=>setQuiz((prev)=>({...prev,deadline:e.target.value}))} required/>
        </div>
      </div>
              {/* Day & Time Slots */}
       {/* Submit Button */}
      <button type="submit" className="btn btn-primary d-block mx-auto">createQuiz</button>
      </fieldset>
    </form>
        <form onSubmit={async (e)=>{
       e.preventDefault();
          await api.post("/quiz-questions",quizas)
         .then((data)=> {setMessageq(data.data);fetchOneque(data.data.question_id)}).catch((error)=>setMessageq(error.message))
         
         //setMessage(data.data.message) 
         //alert('Hello');
         }}>
        {messageq.message && <div className="alert alert-success alert-dismissible">
        <strong>{messageq.message}-{messageq.question_id}</strong> <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
     </div>
      }
          {/*Timetable Name*/}
        <fieldset className="border border-primary rounded p-3">
        <legend className="float-none w-auto px-2">Question info</legend>
        <div className="row mb-1">
       <div className="col-md-12">
          <label  className="form-label">Question description</label>
          <input type="text" className="form-control" id="subject" onChange={(e)=>setQuizas((prev)=>({...prev,question_text:e.target.value}))} placeholder="Ask question now?"/>
        </div>
        </div>
     <div className="row mb-1">
        <div className="col-md-6">
         <label  className="form-label">Mark/Question</label>
         <input type="number" className="form-control" id="subject" onChange={(e)=>setQuizas((prev)=>({...prev,marks:Number(e.target.value)}))}/>
      </div>
    <div className="col-md-6">
     <label className="form-label">LinkQuestionToQuiz</label>
      <select className="form-select" id="subject" onChange={(e)=>setQuizas((prev)=>({...prev,quiz_id:Number(e.target.value)}))} required>
      <option value="">Choose dept...</option>
        
        {
          quizs?.map((item)=>
          <option value={item.quiz_id}>{item.quiz_title}</option>
          )
        }
      
</select>
 </div>
        </div>    


         {/* Date Range */}
      
        {/* Day & Time Slots */}
              {/* Day & Time Slots */}
       {/* Submit Button */}
      <button type="submit" className="btn btn-primary d-block mx-auto">createQuestion</button>
      <button className='btn btn-success' onClick={()=>fetchQuizid(getmesstime.quiz_id)}>Load</button>
      </fieldset>
      </form>

          <form onSubmit={async (e)=>{
       e.preventDefault();
          await api.post("/question-options",option)
          .then((data)=> setOptionres(data.data)).catch((error)=>alert(error.message))

     }}>
       {optionres.message && <div className="alert alert-success alert-dismissible">
     <strong>{optionres.message}-{optionres.option_id}</strong> <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
     </div>
      }
          {/*Timetable Name*/}
        <fieldset className="border border-primary rounded p-3">
        <legend className="float-none w-auto px-2">Question option info</legend>
       <div className="row mb-1">

         <div className="col-md-5">
          <label  className="form-label">Enter choices(options)</label>
          <input type="text" className="form-control" id="subject" onChange={(e)=>setOption((prev)=>({...prev,option_text:e.target.value}))} placeholder="Enter option"/>
        </div>
          <div className="col-md-3">
      <label className="form-label">link option to question</label>
          <select
            className="form-select"
            id="subject"
          onChange={(e) =>setOption((prev) => ({...prev,question_id: Number(e.target.value)}))}required>
         <option value="">Choose </option>
         <option value={oneque?.question_id}>{oneque?.question_text}</option>
            </select>
         </div>

    <div className="col-md-4">
      <input className="form-check-input border border-primary" onChange={(e)=>setOption((prev)=>({...prev,is_correct:Boolean(e.target.value)}))} type="checkbox" name="exampleRadios"/>
       <label className="form-check-label">
        is it a correct option?
       </label>
        <div>
          <button className='btn btn-success' onClick={()=>fetchOneque(oneque?.question_id)}>Loadquestion</button>
        </div>
        </div>
        </div>    

         {/*Day & Time Slots*/}
         {/*Submit Button*/}
      <button type="submit" className="btn btn-primary d-block mx-auto">createOption</button>
      </fieldset>
      </form>
  </div>
  )
}

export default Preparequiz
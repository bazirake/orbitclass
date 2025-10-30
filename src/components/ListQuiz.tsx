
 import React, { useEffect, useState } from 'react'
 import { api } from '../Services/api';
 import { Departments, ApiResponsedepartments, Department, getApiLevel, Level, Semester, Instructor, Course, Day, TimetableType, CourseSchedule, Quiz, QuizSummary, QuizQuestion, Onequestion, QuestionOption, SearchStudent, Sparam, Courses, Sparamc, QuizModel, formatLocalDate } from '../Services/Objects';
 import { error } from 'console';
import { useLocation, useNavigate } from 'react-router-dom';
 function ListQuiz(){
 const[courses,setCourse]=useState<Course[]>();
 const[department,setDepartment]=useState<Department[]>([]);
 const[levels,setLevel]=useState<Level[]>([]);
 const[students,setStudent]=useState<SearchStudent[]>([]);
 const[coursess,setCourses]=useState<Courses[]>([]);
 const[sparam,setPara]=useState<Sparamc>({level:'',department:''});
 const[quizes,setQuiz]=useState<QuizModel[]>([]);                  
 const userinfo = JSON.parse(localStorage.getItem('auth')!);
  const  location=useLocation();
 const navigate=useNavigate();
  useEffect(()=>{
    fetchQuizes();
      //const id=quizs?.map(({quiz})=>quiz)
    },[sparam])
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
                const fetchQuizes = async () => {
        //etIsLoading(true);
         try{
            const response = await api.get<QuizModel[]>(
                   `/api/quizzess/${userinfo.user.id}` // replace with your API URL
          );
              const quizData = response.data.map((quiz: any) => ({
              ...quiz,
               created_at: formatLocalDate(quiz.created_at), // format date for each quiz
               }));
           setQuiz(quizData); // set API array to state
                console.log("table",response.data);
         }catch (err){
                // setError("Failed to fetch departments");
               } finally {
                 //setIsLoading(false);
               }
             }

   const fetchCourse = async()=>{
      //etIsLoading(true);
       try{
          const response = await api.get<Course[]>(
                 "/api/courses" // replace with your API URL
          );
          setCourse(response.data); // set API array to state
              console.log("table",response.data);
         }catch(err){
              //setError("Failed to fetch departments");
             }finally{
               //setIsLoading(false);
             }
           }

            const fetchStudentdetails = async(dept:any,lev:any)=>{
      //etIsLoading(true);
       try{
          const response = await api.get<Courses[]>(
                 `api/coursess?department_id=${dept}&level_id=${lev}` // replace with your API URL
          );
          setCourses(response.data); // set API array to state
              console.log("courses",response.data);
         }catch(err){
              //setError("Failed to fetch departments");
             }finally{
               //setIsLoading(false);
             }
           }

          const ViewDetail=(qid:any,qt:any,qd:any,qma:any,qat:any)=>{
             navigate(`${location.pathname}/${qid}/${qt}/${qd}/${qma}/${qat}`)
            }
      const delquiz = async (quizId: any)=>{
       const confirmed=window.confirm("Are you sure you want to delete this quiz?");
        if(!confirmed)return; // ❌ User canceled
        try{
           const res =await api.delete(`api/delquizzes/${quizId}`);
           if(res.data){
            alert("✅Quiz deleted successfully!");
             fetchQuizes();
           //Optionally reload or refresh list
           }else{
         alert("❌ Failed to delete quiz.");
        }
       }catch(err){
       console.error(err);
       alert("⚠️ Error deleting quiz.");
     }
   };
  return (
     <form onSubmit={(e)=>{
        e.preventDefault();
        fetchStudentdetails(sparam.department,sparam.level)
     }}>
    <fieldset className="border border-primary rounded p-3">
    <legend className="float-none w-auto px-2">Quizes</legend>
            <div className="table-container">
             <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Quiztitle</th>
                            
                            <th>Dept</th>
                            <th>Level</th>
                            <th>Subject</th>
                            <th>Preparedby</th>
                            <th>CreatedAt</th>
                            <th>Action</th>
                         
                        </tr>
                    </thead>
                     <tbody id="studentTable">
                        {quizes.map((item,index)=>(
                           <tr>
                            <td>{index+1}</td>
                            <td>{item.quiz_title}</td>
                            <td>{item.department_name}</td>
                            <td>{item.level_id}</td>
                            <td>{item.course_name}</td>
                            <td>{item.preparedby}</td>
                            <td>{item.created_at}</td>
                            <td>
                               <i style={{cursor:'pointer'}} onClick={()=>ViewDetail(item.quiz_id,item.quiz_title,item.department_name,item.total_marks,item.created_at)} className='bi bi-eye'></i>
                               <i className='px-1 bi bi-trash' onClick={()=>delquiz(item.quiz_id)}></i>
                            </td>
                            </tr>     
                        ))}
                       
                     </tbody>
                </table>
            </div>
        </div>
    </fieldset>
    </form>
  )
}

export default ListQuiz
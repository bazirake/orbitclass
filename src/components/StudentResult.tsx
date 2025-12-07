
import React, { useEffect, useState } from 'react'
import { api } from '../Services/api';
import { Departments, ApiResponsedepartments, Department, getApiLevel, Level, Semester, Instructor, Course, Day, TimetableType, CourseSchedule, Quiz, QuizSummary, QuizQuestion, Onequestion, QuestionOption, SearchStudent, Sparams, StudentQuizResult } from '../Services/Objects';
import { error } from 'console';
   function StudentResult() {
  const[courses,setCourse]=useState<Course[]>([]);
  const[department,setDepartment]=useState<Department[]>([]);
  const[levels,setLevel]=useState<Level[]>([]);
  const[students,setStudents]=useState<StudentQuizResult[]>([]);
  const[sparam,setPara]=useState<Sparams>({department:'',studentnumber:'',cid:'',level:''});

    useEffect(()=>{

     //lert(students[0].STUDENTNUMBER)
       fetchStudentResults(sparam.department,sparam.studentnumber,sparam.cid,sparam.level)
      fetchCourse();
      fetchDepartments();
      fetchLevel();
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
 
      const fetchCourse = async()=>{
           //etIsLoading(true);
        try{
           const response = await api.get<Course[]>(
                 "/api/courses"//replace with your API URL
             );
             setCourse(response.data); // set API array to state
               console.log("table",response.data);
          }catch(err){
               //setError("Failed to fetch departments");
              }finally{
                //setIsLoading(false);
              }
            }

         const  fetchStudentResults = async(dept:any,stun:any,lev:any,cid:any)=>{
                // alert(dept+','+stun+','+lev+','+cid)
                  console.log("Params",sparam);
           try{

           const response = await api.get<StudentQuizResult[]>(
                  `/api/student-results?department=${dept}&studentId=${stun}&course=${cid}&level=${lev}`
                
                   // replace with your API URL
           );
              setStudents(response.data); // set API array to state
          // alert(response.data[0].student_name)
               console.log("result callBack Student",response.data);
          }catch(err){
               //setError("Failed to fetch departments");
              }finally{
                //setIsLoading(false);
              }
            }
 
   return (
      <form onSubmit={(e)=>{
         e.preventDefault();
        // alert('Searched Success');
         fetchStudentResults(sparam.department,sparam.studentnumber,sparam.cid,sparam.level)
      }}>
     <fieldset className="border border-primary rounded p-3">
     <legend className="float-none w-auto px-2">Filter</legend>
         <div className="filter-container mb-4">
             <div className="row g-3">
                 <div className="col-md-3">
                     <label  className="form-label">Department:</label>
                     <select className="form-select" id="deptFilter" onChange={(e)=>setPara((prev)=>({...prev,department:e.target.value}))}>
                        <option value="">All Departments</option>
                          {
                            department.map((item)=>
                        <option value={item.department_id}>{item.department_name}</option>
                          )
                          }
                     </select>
                 </div>
                 <div className="col-md-3">
                     <label  className="form-label">Level:</label>
                     <select className="form-select" id="courseFilter" onChange={(e)=>setPara((prev)=>({...prev,level:e.target.value}))}>
                     <option value="">All Levels</option>
                          {levels.map((item)=>
                         <option value={item.level_id}>{item.description}</option>
                         )
                          }
                     </select>
                 </div>
                  <div className="col-md-2">
                     <label  className="form-label">Course:</label>
                     <select className="form-select" id="courseFilter" onChange={(e)=>setPara((prev)=>({...prev,cid:e.target.value}))}>
                      <option value="">All Course</option>
                        {
                          courses.map((item)=>(
                           <option value={item.course_id}>{item.description}</option>
                          ))
                        }
                          
                     </select>
                 </div>
                  <div className="col-md-2">
                     <label  className="form-label">Studentnumber:</label>
                     <input type='text' className='form-control' onChange={(e)=>setPara((prev)=>({...prev,studentnumber:e.target.value}))}></input> 
                 </div>
                 <div className="col-md-2 mt-3">
                     <button style={{position:'relative',top:30}} className='btn btn-primary'> <i className="bi bi-upload"></i>LoadData</button>
                 </div>
              </div>
             </div>
             <div className="table-container">
              <div className="table-responsive">
                 <table className="table table-striped table-hover">
                     <thead className="table-primary">
                         <tr>
                             <th>ID</th>
                             <th>Department</th>
                             <th>Name</th>
                             <th>Level</th>
                             <th>Subject</th>
                             <th>Studentnumber</th>
                             <th>Tel</th>
                             <th>Tmark</th>
                             <th>Obmark</th>
                             <th>%</th>
                             <th>Status</th>
                         </tr>
                     </thead>
                      <tbody id="studentTable">
                         {students.map((item,index)=>(
                            <tr>
                             <td>{index+1}</td>
                             <td>{item.department}</td>
                             <td>{item.student_name}</td>
                             <td>{item.level_of_study}</td>
                             <td>{item.course}</td>
                             <td>{item.STUDENTNUMBER}</td>
                             <td>{item.student_tel}</td>
                             <td>{item.total_possible_marks}</td>
                             <td>{item.total_marks_obtained}</td>
                             <td>{item.percentage}</td>
                             <td>{item.status}</td>
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
export default StudentResult
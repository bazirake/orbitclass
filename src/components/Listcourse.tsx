
 import React, { useEffect, useState } from 'react'
 import { api } from '../Services/api';
 import { Departments, ApiResponsedepartments, Department, getApiLevel, Level, Semester, Instructor, Course, Day, TimetableType, CourseSchedule, Quiz, QuizSummary, QuizQuestion, Onequestion, QuestionOption, SearchStudent, Sparam, Courses, Sparamc } from '../Services/Objects';
 import { error } from 'console';
   function Listcourse(){
 const[courses,setCourse]=useState<Course[]>();
 const[department,setDepartment]=useState<Department[]>([]);
 const[levels,setLevel]=useState<Level[]>([]);
 const[students,setStudent]=useState<SearchStudent[]>([]);
 const[coursess,setCourses]=useState<Courses[]>([]);
 const[sparam,setPara]=useState<Sparamc>({level:'',department:''});

  useEffect(()=>{
     fetchStudentdetails(sparam.department,sparam.level)
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

  return (
     <form onSubmit={(e)=>{
        e.preventDefault();
        fetchStudentdetails(sparam.department,sparam.level)
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
               
                <div className="col-md-3 mt-3">
                    <button style={{position:'relative',top:30,left:50}} className='btn btn-primary'> <i className="bi bi-upload"></i>LoadData</button>
                </div>
             </div>
            </div>

            <div className="table-container">
             <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Course</th>
                            <th>Coursedes</th>
                            <th>Level</th>
                            <th>CreditHours</th>
                         
                        </tr>
                    </thead>
                     <tbody id="studentTable">
                        {coursess.map((item,index)=>(
                           <tr>
                            <td>{index+1}</td>
                            <td>{item.course_name}</td>
                            <td>{item.description}</td>
                            <td>{item.level_description}</td>
                            <td>{item.credit_hours}</td>
                          
                            
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

export default Listcourse
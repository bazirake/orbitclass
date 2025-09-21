
import React, { useEffect, useState } from 'react'
import { api } from '../Services/api';
import { Departments, ApiResponsedepartments, Department, getApiLevel, Level, Semester, Instructor, Course, Day, TimetableType, CourseSchedule } from '../Services/Objects';
import { error } from 'console';

   function CreateTb() {
   const[department,setDepartment]=useState<Department[]>([]);
   const[levels,setLevel]=useState<Level[]>([]);
   const[semesterss,setSemester]=useState<Semester[]>();
   const[instructor,setInstructor]=useState<Instructor[]>();
   const[courses,setCourse]=useState<Course[]>();
   const[days,setDays]=useState<Day[]>();
   const[types,setType]=useState<TimetableType[]>()
   const[plan,setPlan]=useState({course_id:'',
    instructor_id:0,day_id:0,room:'',start_time:'',end_time:'',semester:'',academic_year:'',level_id:0,deptid:0,typeid:0})
   const[getmess,setMessage]=useState('');
   useEffect(()=>{
   fetchDepartments();
   fetchLevel();
   fetchSemester();
   fetchInstructor();
   fetchCourse();
   fetchDays();
   fetchGettype();
   },[])
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

         const fetchSemester = async () => {
    //etIsLoading(true);
     try{
        const response = await api.get<Semester[]>(
               "/semesters" // replace with your API URL
      );
       setSemester(response.data); // set API array to state
            console.log("table",response.data);
     }catch (err){
            // setError("Failed to fetch departments");
           } finally {
             //setIsLoading(false);
           }
         }

             const fetchDays = async () => {
    //etIsLoading(true);
     try{
        const response = await api.get<Day[]>(
               "/api/days" // replace with your API URL
      );
       setDays(response.data); // set API array to state
            console.log("table",response.data);
     }catch (err){
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

             
         const fetchInstructor = async () => {
    //etIsLoading(true);
     try{
        const response = await api.get<Instructor[]>(
               "/instructors" // replace with your API URL
      );
       setInstructor(response.data); // set API array to state
            console.log("table",response.data);
     }catch (err){
            // setError("Failed to fetch departments");
           } finally {
             //setIsLoading(false);
           }
         }

    const fetchGettype = async () => {
        //etIsLoading(true);
     try{
        const response = await api.get<TimetableType[]>(
               "/timetable-types" // replace with your API URL
        );
        setType(response.data); // set API array to state
            console.log("tablexxx",response.data);
     }catch (err){
            // setError("Failed to fetch departments");
           }finally {
             //setIsLoading(false);
           }
         }

  return (
<div className="container mt-1">
  {getmess && <div className="alert alert-success alert-dismissible">
     <strong>{getmess}</strong> <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
     </div>
      }

    <h5 className="mb-3 text-center">Create New Timetable</h5>
    <form onSubmit={async (e)=>{
       e.preventDefault();
          await api.post("/createtimetable",plan)
          .then((data)=> setMessage(data.data.message)).catch((error)=>setMessage(error.message))
        //setMessage(data.data.message) 
       //alert('Hello');
     }}>
          {/*Timetable Name*/}
<div className="row mb-3">
<div className="col-md-4">
 <label className="form-label">Department</label>
  <select className="form-select" id="subject" onChange={(e)=>setPlan((prev)=>({...prev,deptid:Number(e.target.value)}))} required>
    <option value="">Choose dept...</option>
    {
        department.map((item)=>
        <option value={item.department_id}>{item.department_name}</option>
        )
    }
</select>
 </div>

 <div className="col-md-4">
        <label className="form-label">Level</label>
          <select className="form-select" id="dayOfWeek" onChange={(e)=>setPlan((prev)=>({...prev,level_id:Number(e.target.value)}))} required>
            <option value="">Choose...</option>
             {levels.map((item)=>
             <option value={item.level_id}>{item.description}</option>
            )
             }
       
        </select>
        </div>
        <div className="col-md-4">
          <label  className="form-label">Semester</label>
           <select className="form-select" id="dayOfWeek" onChange={(e)=>setPlan((prev)=>({...prev,semester:e.target.value}))} required>
            <option value="">Choose...</option>
            {
                semesterss?.map((item)=>
                <option value={item.semester_id}>{item.semester_name}</option>
                )
            }
            
          </select>
        </div>
      </div>

         {/* Date Range */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Academic year</label>
          <select className="form-select" id="dayOfWeek" onChange={(e)=>setPlan((prev)=>({...prev,academic_year:e.target.value}))} required>
            <option value="">Choose...</option>
              {
                semesterss?.map((item)=>
                <option value={item.academic_year}>{item.academic_year}</option>
                )
              }
          </select>
        </div>
       
         <div className="col-md-6">
          <label  className="form-label">Lecturer/Instructor</label>
             <select className="form-select" onChange={(e)=>setPlan((prev)=>({...prev,instructor_id:Number(e.target.value)}))} id="dayOfWeek">
            <option value="">Choose...</option>

                {
                instructor?.map((item)=>
                <option value={item.instructor_id}>{item.first_name}{item.last_name}</option>
                )
            }

          </select>
        </div>
      </div>
        {/* Day & Time Slots */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Day of the Week</label>
          <select className="form-select" id="dayOfWeek" onChange={(e)=>setPlan((prev)=>({...prev,day_id:Number(e.target.value)}))} required>
            <option value="">Choose...</option>
            {
                days?.map((item)=>(
                 <option value={item.day_id}>{item.day_name}</option>
                ))
            }
          
          </select>
        </div>
        <div className="col-md-4">
        <label  className="form-label">Start Time</label>
          <input type="time" className="form-control" id="startTime" onChange={(e)=>setPlan((prev)=>({...prev,start_time:e.target.value}))} required/>
        </div>
        <div className="col-md-4">
          <label  className="form-label">End Time</label>
          <input type="time" className="form-control" id="endTime" onChange={(e)=>setPlan((prev)=>({...prev,end_time:e.target.value}))} required/>
        </div>
      </div>

              {/* Day & Time Slots */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Type</label>
          <select className="form-select" onChange={(e)=>setPlan((prev)=>({...prev,typeid:Number(e.target.value)}))} id="dayOfWeek">
            <option value="">Choose...</option>
             {
                types?.map((item)=>
                <option value={item.id}>{item.type_name}</option>
             )}
          </select>
        </div>
         <div className="col-md-4">
          <label className="form-label">Subject</label>
       <select className="form-select"  id="subject" onChange={(e)=>setPlan((prev)=>({...prev,course_id:e.target.value}))}>
    <option value="">Choose subject...</option>
    {courses?.map((item)=>
    <option value={item.course_id}>{item.course_name}</option>
   )}
  
  
</select>
         
          
 </div>
        <div className="col-md-4">
          <label  className="form-label">Room(Optional)</label>
          <input type="text" className="form-control" id="subject" onChange={(e)=>setPlan((prev)=>({...prev,room:e.target.value}))} placeholder="Room or location"/>
        </div>
      </div>
       {/* Submit Button */}
      <button type="submit" className="btn btn-primary d-block mx-auto">Create Timetable</button>
    </form>
  </div>
  )
}

export default CreateTb
import React, { useEffect, useState } from 'react'
import { Day, Department, getApiLevel, Level, Searchparm, Semester, TimetableRow } from '../Services/Objects';
import { api } from '../Services/api';
import { data } from 'react-router-dom';
import ExportPdf from './ExportPdf';

function TimetableTabs() {

    const[timetable,setTimetable]=useState<TimetableRow[]>([]);
    const[department,setDepartment]=useState<Department[]>([]);
    const[levels,setLevel]=useState<Level[]>([]);
    const[days,setDays]=useState<Day[]>();
    const[semesterss,setSemester]=useState<Semester[]>();
    const[timepar,searchTime]=useState<Searchparm>({department_id:'',level_id:'',day_name:'',semester_id:''});
    
    const deleteHandle=()=>{
    const confirmed = window.confirm('Are you sure you want to delete this time table?');
    if (confirmed) {
      // perform delete action
      alert('confirmed'+confirmed);
    } else {
      alert('canceled'+confirmed);
    }
    }
     useEffect(()=>{
     //fetchTimetable();
     fetchDepartments();
     fetchLevel();
     fetchSemester();
     fetchDays();
     fetchTimetable(timepar)
    },[]);
         const fetchTimetable = async (data:Searchparm) => {
        //etIsLoading(true);
         try{
            const response = await api.post<TimetableRow[]>(
                "/timetableSearch",data // replace with your API URL
          );
           setTimetable(response.data); // set API array to state
                console.log("hellotables",response.data);
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
            console.log("semester",response.data);
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
             const searchTimeTable=(param:Searchparm)=>{
                fetchTimetable(param)
                console.log("show",param)
                //alert(param.day)
                }
     return (
       <div>
           <div className="mb-2 ">
              
               <div className='d-flex flex-row justify-content-between'>
                <div className='d-flex'>
                    <div>
                   <label  className="form-label mx-2 fw-semibold">Filter by Department:</label>
                  <select id="departmentFilter" onChange={(e)=>searchTime((prev)=>({...prev,department_id:e.target.value}))} className="form-select w-auto mx-1">
                   <option value="">Choose</option>
                  
                   {
                    department.map((item)=>
                        <option value={item.department_id}>{item.department_name}</option>
                    )
                   }

                   
               </select>

                    </div>
                  <div>
                  <label  className="form-label mx-2 fw-semibold">Filter by Levels:</label>
                 <select id="departmentFilter" onChange={(e)=>searchTime((prev)=>({...prev,level_id:e.target.value}))} className="form-select w-auto mx-1">
                    <option value="">Choose</option>
                   {
                    levels.map((item)=>
                        <option value={item.level_id}>{item.description}</option>
                    )
                   }
                   
               </select>
               </div>
                <div>
                <label  className="form-label mx-2 fw-semibold">Filter by Semester:</label>
                 <select id="departmentFilter" onChange={(e)=>searchTime((prev)=>({...prev, semester_id:e.target.value}))} className="form-select w-auto">
                    <option value="">Choose</option>
                     {
                     semesterss?.map((items)=>
                     <option value={items.semester_id}>{items.semester_name}</option>
                    )
                   }
                   
               </select>
               </div>
               <div>
                <label  className="form-label mx-2 fw-semibold">Filter by day:</label>
                 <select id="departmentFilter" onChange={(e)=>searchTime((prev)=>({...prev,day_name:e.target.value}))} className="form-select w-auto">
                    <option value="">Choose</option>
                   
                    {
                     days?.map((items)=>
                     <option value={items.day_name}>{items.day_name}</option>
                    )
                   }
               </select>
               </div>
               
                </div>

               <div className='d-flex justify-content-end'>
                <button onClick={()=>searchTimeTable(timepar)} className='btn btn-primary text-white mx-2'><i className='bi bi-search mx-1'></i></button>
               {/*<button onClick={deleteHandle} className='btn btn-danger text-white mx-2'><i className='bi bi-trash mx-1'></i></button> */}
                 <ExportPdf data={timetable} />
               </div>
              
               </div>
              
           </div>
           <div className="table-responsive">
               <table className="table table-bordered timetable">
                   <thead>
                       <tr>
                           <th scope="col">Time</th>
                           <th scope="col">Department</th>
                           <th scope="col">Level</th>
                           <th scope="col">Semester</th>
                           <th scope="col">Monday</th>
                           <th scope="col">Tuesday</th>
                           <th scope="col">Wednesday</th>
                           <th scope="col">Thursday</th>
                           <th scope="col">Friday</th>
                           <th scope="col">Saturday</th>
                           <th scope="col">Sunday</th>
                           
                       </tr>
                   </thead>
                   <tbody>
                    {
                       timetable?.map((item)=>
                        <tr data-department={item.department_name}>
                           <th scope="row">{item.timerange}</th>
                           <td>{item.department_name}</td>
                           <td>{item.level}</td>
                           <td>{item.semester_name}</td>
                           <td><div className=''>{item.Monday}</div></td>
                           <td><div className=" ">{item.Tuesday}</div></td>
                           <td><div className="">{item.Wednesday}</div></td>
                           <td><div className="">{item.Thursday}</div></td>
                           <td><div className="">{item.Friday}</div></td>
                           <td><div className="">{item.Saturday}</div></td>
                           {item.Sunday==='Break' ? (<td colSpan={6} className="table-success">{item.Sunday}</td>):(<td><div className="">{item.Sunday}</div></td>)} 
                       </tr>
                     
                    )
                    }
                       
                     
                      
                       
                      
                   </tbody>
               </table>
           </div>
           </div> 
  )
}

export default TimetableTabs
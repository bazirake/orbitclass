import React, { useEffect, useState } from 'react'
import { StudentResult } from '../Services/Objects';
import { api } from '../Services/api';
import { useParams } from 'react-router-dom';

function Sresult(){
    const userinfo =JSON.parse(localStorage.getItem('auth')!);
    //const quizid = Number(localStorage.getItem('quizid') ?? 0);
    const [sresult,setSresult]=useState<StudentResult>()
    const {id}=useParams();
    const {lid}=useParams();

    useEffect(()=>{
      const quizid =Number(localStorage.getItem('quizid') ?? 0);
        fetchStudentResult(Number(userinfo.user.id),quizid);
    },[]) 

      const fetchStudentResult = async(studentnumber:any,quizid:any)=>{
                         //etIsLoading(true);
                         try{
                            const response =await api.get<StudentResult>(
                             `/api/student-result/${studentnumber}/${quizid}` // replace with your API URL
                             );
                            setSresult(response.data); // set API array to state
                                 console.log("table",response.data);
                            }catch (err){
                                 alert('Failed while fetching student result');
                            }finally{
                               //setIsLoading(false);
                            }
                            }
         //alert(deptid)
  return (
   <div className="row justify-content-center mt-4">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-header bg-light text-dark">
            <h4 className="mb-0">Quiz Result</h4>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
             
              <li className="list-group-item">
                <strong>Total Marks Obtained:</strong> {sresult?.total_marks_obtained}
              </li>
              <li className="list-group-item">
                <strong>Total Possible Marks:</strong> {sresult?.total_possible_marks}
              </li>
              <li className="list-group-item">
                <strong>Percentage:</strong>{sresult?.percentage}%
              </li>
              <li className="list-group-item">
                <strong>Status:</strong> <span className="badge bg-success">{sresult?.status}</span>
              </li>
            </ul>
            {/* <div className="d-grid mt-3">
              <a href="#" className="btn btn-primary">View Detailed Report</a>
            </div> */}
          </div>
        </div>
      </div>
  </div>
  )
}

export default Sresult

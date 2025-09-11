
import React, { useEffect, useState } from 'react'
import { api } from '../Services/api';
import { Login, Loginerror, Department, UserType, Level, Account, Accounterror, ApiResponsedepartment, getApiUserType, getApiLevel } from '../Services/Objects';

function Loginc() {
const [islogin,setLogin]=useState(true);
  const [logindata,setLogindata]=useState<Login>({studentnumber:'',password:''})
  const [errorl,setErrorLogin]=useState<Loginerror>()
  const [isLoading,setLoading]=useState(false);
  const [departments,setDepartment]=useState<Department[]>([]);
  const[usersty,setUsertype]=useState<UserType[]>([]);
  const[levels,setLevel]=useState<Level[]>([]);
  const[account,setAccount]=useState<Account>({fullname:'',department:'',usertype:'',email:'',password:'',tel:'',classes:'',studentnumber:''});
  const[erraccount,setErroraccount]=useState<Accounterror>()
  const[passc,setPassc]=useState('');
  const[respo,setRespo]=useState();
  const[relogin,setLogrespo]=useState();
  
  const validateAccount=()=>{
    const phoneRegex = /^(\+250|0)(7[2-9]\d{7})$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const error:Accounterror={};
   if(account.classes=="" || account.classes==null){
      error.classes="Class field should not be empty";
    }
     if(account.department=="" || account.department==null){
      error.department="Department field should not be empty";
   }
      if(account.email=="" || account.email==null){
      error.email="Email field should not be empty";
   }
 if(account.usertype=="" || account.usertype==null){
      error.usertype="Usertype field should not be empty";
   }
    if(account.tel=="" || account.tel==null){
      error.tel="Tel field should not be empty";
   }
     if(account.studentnumber=="" || account.studentnumber==null){
      error.studentnumber="Student number field should not be empty";
   }
     if(account.fullname=="" || account.fullname==null){
      error.fullname="Fullname field should not be empty";
     }
     if(account.password=="" || account.password==null){
      error.password="Password field should not be empty";
    }
     if(account.studentnumber.length!=7){
      error.studentnumber="Number code should be 7 in length";
    }
     if(account.password!=passc){
      error.studentnumber="Passwords do not match";
    }
    if (!phoneRegex.test(account.tel)) {
        error.tel="Invalid phone number format";
    }
    if(!emailRegex.test(account.email)) {
        error.tel="Invalid Email  format";
    }
    setErroraccount(error)
    return Object.keys(error).length==0
  }

  const validate=()=>{
  const errordata:Loginerror={}
   if((logindata.studentnumber=='' ||logindata.studentnumber==null)) {
      errordata.errornumber="Please Enter Student number"
    }
    if(logindata.password=='' ||logindata.password=="") {
      errordata.errorpass="Please Enter student number"
    }
      if ((logindata.studentnumber.length!=7)) {
    errordata.errornumber="length of student number should be 7"
    } 
     setErrorLogin(errordata);
    return Object.keys(errordata).length==0

  }
useEffect(() => {
    const fetchDepartments = async () => {
      //etIsLoading(true);
      try {
        const response = await api.get<ApiResponsedepartment>(
          "/departments" // replace with your API URL
        );
        setDepartment(response.data.results); // set API array to state
       // console.log(departments);
      } catch (err) {
       // setError("Failed to fetch departments");
      } finally {
        //setIsLoading(false);
      }
    };

     const fetchUsertype = async()=>{
      //etIsLoading(true);
      try{
         const response = await api.get<getApiUserType>(
          "/user-types" // replace with your API URL
        );
         setUsertype(response.data.userTypes);//set API array to state
         console.log(usersty);
      } catch (err) {
       // setError("Failed to fetch departments");
      } finally {
        //setIsLoading(false);
      }
    };

     const fetchLevel = async () => {
      //etIsLoading(true);
      try{
         const response = await api.get<getApiLevel>(
          "/levels" // replace with your API URL
        );
         setLevel(response.data.levels);//set API array to state
         //console.log(levels);
      } catch (err) {
       // setError("Failed to fetch departments");
      } finally {
        //setIsLoading(false);
      }
    };
     fetchLevel();
    fetchDepartments();
    fetchUsertype();
  }, []);
     
  // console.log(departments);


   return (
       <div className="container">
          {
         islogin ? (
        <div className="row justify-content-center align-items-center min-vh-100">
               <div className="col-md-6 col-lg-4">
                   <div className="card shadow">
                       <div className="card-body text-center">
                         
                           <img src="https://global.kduniv.ac.kr/global/_Img/logo.gif" alt="Logo" className="mb-4"/>
                           <h3 className="card-title mb-4">Sign-in</h3>
                           <form onSubmit={(e)=>{
                              e.preventDefault()
                              if(validate()){
                               setLoading(true)
                                api.post("/login",logindata).
                                then((data)=>setRespo(data.data.message)).
                                catch(err=>setRespo(err.message)).finally(()=>setLoading(false));
                                setLoading(false)
                               }
                            
                           }}>
                               <div className="mb-3">
                                   <label  className="form-label">
                                   StudentNumber
                                       </label>
                                   <input type="text" value={logindata.studentnumber} onChange={(e)=>setLogindata((prev)=>({...prev,studentnumber:e.target.value}))} className="form-control" id="username" placeholder="Enter Student number"/>
                                   {errorl?.errornumber&& (
                                    <span className="text-danger text-sm">{errorl.errornumber}</span>
                                   )}
                               </div>
                               <div className="mb-3">
                                   <label className="form-label">Password</label>
                                   <input type="password" value={logindata.password} onChange={(e)=>setLogindata((prev)=>({...prev,password:e.target.value}))} className="form-control" id="password" placeholder="Enter password"/>
                                   {errorl?.errorpass&& (
                                    <span className="text-danger text-sm">{errorl.errorpass}</span>
                                   )}
                               </div>
                               <div className="d-grid gap-2 mb-3">
                                   <button type="submit" className="btn btn-primary">
                                     {
                                     isLoading &&
                                     (
                                       <>
                                     <span className="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                     <span className="sr-only"></span>
                                     </>
                                      )
                                     }
                                  Sign-in</button>
                               </div>
                               {respo &&<span className="text-danger text-sm">{respo}</span>}
                               <div className="d-flex justify-content-between">
                                   <a onClick={()=>setLogin(false)} className="btn btn-outline-secondary">Sign-up</a>
                                   <button type="reset" className="btn btn-outline-danger">Reset</button>
                               </div>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
   
         ): (
              <div className="row justify-content-center  min-vh-100">
               <div className="col-md-8 col-lg-6">
                   <div className="card shadow">
                       <div className="card-body">
                           <div className='text-center'>
                                  <img src="https://global.kduniv.ac.kr/global/_Img/logo.gif" alt="Logo" className="mb-4"/>
                           <h4 className="card-title mb-2">Create account</h4>
                           </div>
                        
                           <form onSubmit={(e)=>{
   
                                e.preventDefault();
   
                                if (validateAccount()) {
                                   api.post("/createaccount",account).
                                then((data)=>setRespo(data.data.message)).
                                catch(err=>setLogrespo(err.response.data.sqlMessage)).finally(()=>setLoading(false));
                                setLoading(false)
                                }
                                
   
                           }}>
                               <div className="row">
                                   <div className="col-md-6">
                                   <div className="mb-2">
                                     <label  className="form-label">Select UsertType</label>
                                   <select id="exampleSelect" onChange={(e)=>setAccount((prev)=>({...prev,usertype:e.target.value}))} className="form-select">
                                        <option>Select User type </option>
                                       {
                                         usersty.map((item)=>(
                                            <option value={item.user_type_id}>{item.type_name}</option>
                                       ))
                                       }
                                   </select>
                                     {erraccount?.usertype && (
                                    <span className="text-danger text-sm">{erraccount?.usertype}</span>
                                   )}
                                  </div>
                                       <div className="mb-2">
                                         <label  className="form-label">Fullname</label>
                               <input type="text" onChange={(e)=>setAccount((prev)=>({...prev,fullname:e.target.value}))} className="form-control" id="firstName" placeholder="Enterf fullname"/>
                                              {erraccount?.fullname && (
                                    <span className="text-danger text-sm">{erraccount?.fullname}</span>
                                   )}
                                       </div>
                                       <div className="mb-2">
                                           <label className="form-label">
                                                     {account.usertype=='1'? 'LecturerNumber':'StudentNumber'}  
                                              </label>
                                           <input type="text" onChange={(e)=>setAccount((prev)=>({...prev,studentnumber:e.target.value}))} className="form-control" id="email" placeholder="Enter Studentnumber"/>
                                              {erraccount?.studentnumber && (
                                    <span className="text-danger text-sm">{erraccount?.studentnumber}</span>
                                   )}
                                       </div>
                                       <div className="mb-2">
                                            <label  className="form-label">Password</label>
                                            <input onChange={(e)=>setAccount((prev)=>({...prev,password:e.target.value}))} type="password" className="form-control" id="password" placeholder="Enter password"/>
                                               {erraccount?.password && (
                                         <span className="text-danger text-sm">{erraccount?.password}</span>
                                        )}
                                       </div>
                                       <div className="mb-2">
                                           <label  className="form-label">Confirm Password</label>
                                           <input type="password" value={passc} onChange={(e)=>setPassc(e.target.value)} className="form-control" id="phone" placeholder="confirm password"/>
                                              {erraccount?.password && (
                                    <span className="text-danger text-sm">{erraccount?.password}</span>
                                   )}
                                       </div>
                                   </div>
                                  
                                   <div className="col-md-6">
                                       <div className="mb-2">
                                     <label  className="form-label">Select Level</label>
                                   <select onChange={(e)=>setAccount((prev)=>({...prev,classes:e.target.value}))} id="exampleSelect" className="form-select">
                                       <option>Select level</option>
                                      {levels.map((item)=>(
                                      <option value={item.level_id}>{item.level_name}-{item.description}</option>
                                      ))
                                      }
                                     
                                    </select>
                                       {erraccount?.classes && (
                                    <span className="text-danger text-sm">{erraccount?.classes}</span>
                                   )}
                                       </div>
                                       <div className="mb-2">
                                           <label  className="form-label">Email</label>
                                           <input onChange={(e)=>setAccount((prev)=>({...prev,email:e.target.value}))} type="text" className="form-control" id="username" placeholder="Enter email"/>
                                              {erraccount?.email && (
                                    <span className="text-danger text-sm">{erraccount?.email}</span>
                                   )}
                                       </div>
                                       <div className="mb-2">
                                           <label  className="form-label">Phone number</label>
                                           <input onChange={(e)=>setAccount((prev)=>({...prev,tel:e.target.value}))} type="text" className="form-control" id="confirmPassword" placeholder="Phone number"/>
                                              {erraccount?.tel && (
                                          <span className="text-danger text-sm">{erraccount?.tel}</span>
                                       )}
                                       </div>
                                       <div className="mb-2">
                                 <label  className="form-label">Select Department</label>
                                  <select id="exampleSelect" onChange={(e)=>setAccount((prev)=>({...prev,department:e.target.value}))} className="form-select">
                                    <option >Select department</option>
                                    {
                                   
                                   departments.map((dept)=>(
                                        <option value={dept.department_id}>{dept.department_name}</option>
                                    ))
                                   }
                                   </select>
   
                                      {erraccount?.department && (
                                    <span className="text-danger text-sm">{erraccount?.department}</span>
                                   )}
                                   </div>
                                   </div>
                               </div>
                               <div className="d-flex justify-content-between mt-2">
                                   <button type="submit" className="btn btn-primary w-50 ml-2">Save</button>
                                   <a onClick={()=>setLogin(true)} className="btn btn-outline-secondary w-50 mx-3">Sign-in</a>
   
                               </div>
                               <div className='d-flex justify-content-center'>
                                 {relogin &&<span className="text-danger text-center text-sm py-1">{relogin}</span>}
                               </div>
                               
                           </form>
                       </div>
                   </div>
               </div>
           </div>
         )
          }
       </div>
     );
}


export default Loginc

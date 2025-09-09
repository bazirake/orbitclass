import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {

  const [islogin,setLogin]=useState(true);

  return (
    <div className="container">
       {
      islogin ? (
     <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-4">
                <div className="card shadow">
                    <div className="card-body text-center">
                      
                        <img src="https://via.placeholder.com/150x50?text=Logo" alt="Logo" className="mb-4"/>
                        <h3 className="card-title mb-4">Sign-in</h3>
                        <form>
                            <div className="mb-3">
                                <label  className="form-label">StudentNumber</label>
                                <input type="text" className="form-control" id="username" placeholder="Enter username"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter password"/>
                            </div>
                            <div className="d-grid gap-2 mb-3">
                                <button type="submit" className="btn btn-primary">Sign-in</button>
                            </div>
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
           <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-8 col-lg-6">
                <div className="card shadow">
                    <div className="card-body text-center">
                        <img src="https://via.placeholder.com/150x50?text=Logo" alt="Logo" className="mb-4"/>
                        <h3 className="card-title mb-4">Create account</h3>
                        <form>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                      <label  className="form-label">Fulname</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email"/>
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter password"/>
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Phone Number</label>
                                        <input type="tel" className="form-control" id="phone" placeholder="Enter phone number"/>
                                    </div>
                                   
                                </div>
                               
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label  className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="Enter last name"/>
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Enter username"/>
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Confirm Password</label>
                                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password"/>
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Date of Birth</label>
                                        <input type="date" className="form-control" id="dob"/>
                                    </div>
                                  
                                </div>
                                                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label  className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="Enter last name"/>
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Enter username"/>
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Confirm Password</label>
                                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password"/>
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Date of Birth</label>
                                        <input type="date" className="form-control" id="dob"/>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <button type="submit" className="btn btn-primary w-50 ml-2">Save</button>
                                <a onClick={()=>setLogin(true)} className="btn btn-outline-secondary w-50 mx-3">Sign-in</a>
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

export default App;

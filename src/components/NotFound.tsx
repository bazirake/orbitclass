import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return(
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
        <h1 className="display-3 fw-bold text-danger mb-3">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
         <p className="text-muted mb-4">
             Sorry, the page you are looking for doesn’t exist or has been moved.
         </p>
        <Link to="/" className="btn btn-primary px-4">
          <i className="bi bi-arrow-left"></i>  Go to Login
        </Link>
    </div>
  );
};

export default NotFound;

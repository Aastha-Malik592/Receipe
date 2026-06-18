import React from 'react'

 import { useNavigate } from "react-router-dom";
const AuthLayout = ({children}) => {
    const navigate = useNavigate();
  return (
   
       <div className="authContainer">
      <div className="left-side">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="Authentication"
        />
      </div>

      <div className="right-side">
        <div className="authBox">
          <button
     className="back-btn"
            onClick={() => navigate(-1)}
          >
    Back
          </button>
          
        {children}


        <button className="google-btn">
            Sign In with Google
          </button>

   </div>
   </div>
   </div>
  );
}

export default AuthLayout

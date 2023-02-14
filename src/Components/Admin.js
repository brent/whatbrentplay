import React, { Component, useState } from 'react';
//import { Redirect } from 'react-router-dom';

import AdminIndex from './AdminIndex';
import AdminLogInForm from './AdminLogInForm';
import AdminFeedbackBanner from './AdminFeedbackBanner';

import '../css/admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleAdminLogInSubmit = (e) => {
    e.preventDefault();

    if ((process.env.REACT_APP_ADMIN_USER === e.target.username.value) &&
      (process.env.REACT_APP_ADMIN_PASSWORD === e.target.password.value)) {
      setIsLoggedIn(true);
    } else {
      alert("Credentials incorrect, try again");
    }
  }

  return(
    <div className="adminWrapper">
      {
        submitResult
          ? <AdminFeedbackBanner success={ submitResult } />
          : null
      }
      <h2 className="adminWrapper__heading">Admin</h2>
      {
        isLoggedIn
          ? <AdminIndex isLoggedIn={isLoggedIn} />
          : <AdminLogInForm
              onSubmit={ handleAdminLogInSubmit }
            />
      }
    </div>
  )
}

export default Admin;

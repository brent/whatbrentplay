import React, { Component } from 'react';

import '../css/adminFeedbackBanner.css';

const AdminFeedbackBanner = (props) => (
  <div className="adminFeedbackBanner">
    {
      props.success
        ? <p className="success">SUCCESSSSSSSSS</p>
        : <p className="error">RUH ROH</p>
    }
  </div>
)

export default AdminFeedbackBanner;

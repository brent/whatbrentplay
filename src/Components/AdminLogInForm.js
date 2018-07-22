import React from 'react';

import '../css/adminLogInForm.css';

const AdminLogInForm = (props) => (
  <form className="adminLogInForm" onSubmit={props.onSubmit}>
    <div>
      <input type="text" name="username" id="username" placeholder="username"/>
    </div>
    <div>
      <input type="password" name="password" id="password" placeholder="password" />
    </div>
    <div>
      <button type="submit">Log in</button>
    </div>
  </form>
)

export default AdminLogInForm;

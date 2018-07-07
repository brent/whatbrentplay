import React from 'react';

const AdminLogInForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      <label for="username">username</label>
      <input type="text" name="username" id="username" />
    </div>
    <div>
      <label for="password">password</label>
      <input type="password" name="password" id="password" />
    </div>
    <div>
      <button type="submit">submit</button>
    </div>
  </form>
)

export default AdminLogInForm;

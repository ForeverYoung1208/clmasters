import React, { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

import './UserInfo.scss';

const UserInfo = () => {
  const { auth } = useContext(AuthContext)
  return (
    auth.currentUser 
    ? <>
      <div className="userinfo-email"> {auth.currentUser.email}</div>
      <button onClick={auth.logout}> Log out</button>
    </>
    : null
  );
};



export default UserInfo;

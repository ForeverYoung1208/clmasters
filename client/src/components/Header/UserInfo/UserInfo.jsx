import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { AuthContext } from '../../../context/authContext';

import './UserInfo.scss';
import { authLogoutUser } from '../../../store/actions/auth';

const UserInfo = () => {
  // const { auth } = useContext(AuthContext)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch( authLogoutUser())
  }

  const currentUser = useSelector(store => store.auth.currentUser)
  
  return (
    currentUser 
    ? <>
      <div className="userinfo-email"> {currentUser.email}</div>
      <button onClick={logout}> Log out</button>
    </>
    : null
  );
};



export default UserInfo;

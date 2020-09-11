import React from 'react';
import { useDispatch} from 'react-redux';

import './UserInfo.scss';
import { authLogoutUser } from '../../../store/actions/auth';
import withCurrentUser from '../../../HOC/withCurrentUser';

const UserInfo = (props) => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch( authLogoutUser())
  }
  const {currentUser} = props

  return (
    currentUser?.email ? <>
      <div className="userinfo-email"> {currentUser.email}</div>
      <button onClick={logout}> Log out</button>
    </>
    : null
  );
};



export default withCurrentUser(UserInfo);

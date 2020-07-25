import React, { useContext } from 'react';
import { AuthContext } from '../../context/contexts';

import './userInfo.scss';

const UserInfo = () => {
  const { auth } = useContext(AuthContext)
  return (
    <>
      {auth.currentUser && <div className="userinfo-email">{auth.currentUser.email}</div>}
      {auth.currentUser && <button onClick={auth.logout}> Log out</button>}
    </>
  );
};

export default UserInfo;

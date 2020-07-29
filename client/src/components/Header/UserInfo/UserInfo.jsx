import React, { useContext } from 'react';
import { AuthContext } from '../../../context/contexts';
import { CSSTransition } from 'react-transition-group';

import './UserInfo.scss';

const UserInfo = () => {
  const { auth } = useContext(AuthContext)
  return (
    <CSSTransition
    in={!!auth.currentUser}
    timeout={300}
    classNames="appear"
    unmountOnExit            
    >

      <>
        {auth.currentUser && <div className="userinfo-email">{auth.currentUser.email}</div>}
        {<button onClick={auth.logout}> Log out</button>}
      </>
    </CSSTransition>

  );
};

export default UserInfo;

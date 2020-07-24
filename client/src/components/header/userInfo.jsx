import React, { useContext } from 'react';
import PT from 'prop-types';
import { AuthContext } from '../../context/contexts';
import Button from '../../ui/button';

import './userInfo.scss';

const UserInfo = () => {
  const { auth } = useContext(AuthContext)
  return (

    <div className="header__user-info">
      {auth.currentUser && <div className="header__user-email">auth.currentUser.email</div>}
      {auth.currentUser && <Button onClick={auth.logout}> Log out</Button>}
    </div>
  );
};

UserInfo.propTypes = {
    
};

export default UserInfo;

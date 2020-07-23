import React, { useContext } from 'react';

import { AuthContext } from '../context/contexts';

import './header.scss';

const Header = () => {
  const { auth } = useContext(AuthContext)

  return (
      <div className="header">
        {auth.currentUser && auth.currentUser.email}
          
      </div>
  );
};


export default Header;
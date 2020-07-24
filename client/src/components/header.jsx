import React, { useContext } from 'react';

// import { AuthContext } from '../context/contexts';

import './header.scss';
import logoImg from '../img/glow_clock2.png';
import Button from '../ui/button';
import UserInfo from './header/userInfo';

const Header = () => {
  // const { auth } = useContext(AuthContext)

  return (
      <div className="header">
        <div className="header__logo">
          <img src={logoImg} alt="logo"/>
          <div className="caption"> Clock Masters</div>
        </div>
        <div className="header__menu">
          menu here

        </div>
        <UserInfo/>

          
      </div>
  );
};


export default Header;
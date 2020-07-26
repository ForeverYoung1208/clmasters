import React from 'react';

import logoImg from '../img/glow_clock2.png';
import Menu from './header/menu';
import UserInfo from './header/userInfo';

import './header.scss';

const Header = () => {

  return (
      <div className="header">
        <div className="header__logo">
          <img src={logoImg} alt="logo"/>
          <div className="caption"> Clock Masters</div>
        </div>
        <div className="header__menu">
          <Menu/>
        </div>
        <div className="header__user-info">
            <UserInfo key='userInfo'/>
        </div>
      </div>
  );
};


export default Header;
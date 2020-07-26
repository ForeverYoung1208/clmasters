import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
          <ReactCSSTransitionGroup
            transitionAppear={true}
            transitionAppearTimeout={500}            
            transitionName="userInfoTransition"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            <UserInfo key='userInfo'/>
          </ReactCSSTransitionGroup>
        </div>
      </div>
  );
};


export default Header;
import React from 'react';

import logoImg from '../../img/glow_clock2.png';
import Menu from './Menu/Menu';
import UserInfo from './UserInfo/UserInfo';

import './Header.scss';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import withAppear from '../../HOC/withAnimationAppear';


const UserInfoAnimated = withAppear(UserInfo);

export const Header = () => {
  const {auth} = useContext(AuthContext)

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
            <UserInfoAnimated key='userInfo' isShown = {!!auth.currentUser}/>
        </div>
      </div>
  );
};

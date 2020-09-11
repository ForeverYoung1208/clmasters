import React from 'react';

import logoImg from '../../img/glow_clock2.png';
import Menu from './Menu/Menu';
import UserInfo from './UserInfo/UserInfo';

import './Header.scss';
import withAppear from '../../HOC/withAnimationAppear';
import withCurrentUser from '../../HOC/withCurrentUser';


const UserInfoAnimated = withAppear(UserInfo);

const Header = (props) => {
  const {currentUser} = props

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
            <UserInfoAnimated key='userInfo' isShown = {!!currentUser}/>
        </div>
      </div>
  );
};

export default withCurrentUser(Header)
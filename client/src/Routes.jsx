import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
// import { useSelector } from 'react-redux';

import AdminPage from './pages/AdminPage/AdminPage';
import AuthPage from './pages/AuthPage/AuthPage';
import MastersPage from './pages/MastersPage/MastersPage';
// import { AuthContext } from './context/authContext';
import InfoPage from './pages/InfoPage/InfoPage';
// import { useEffect } from 'react';
import withCurrentUser from './HOC/withCurrentUser';

const Routes = (props) => {
  
  const { currentUser } = props
  
  return (
    <Switch>
      <Route path="/info" >
        <InfoPage/>
      </Route>
      <Route path="/masters">
        <MastersPage/>
      </Route>
      <Route path="/login" >
        <AuthPage/>
      </Route>
      <Route path="/user" >
        UserPage
      </Route>
      { currentUser?.isAdmin && <Route path="/admin" >
          <AdminPage/>
        </Route>
      }
      <Redirect to = "/info"/>
    </Switch>
  ) 
}

export default withCurrentUser(Routes);
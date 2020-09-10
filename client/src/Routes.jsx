import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminPage from './pages/AdminPage/AdminPage';
import AuthPage from './pages/AuthPage/AuthPage';
import MastersPage from './pages/MastersPage/MastersPage';
// import { AuthContext } from './context/authContext';
import InfoPage from './pages/InfoPage/InfoPage';

export const Routes = () => {

  
  
  const currentUser = useSelector(store => store.auth.currentUser)
  
  
  // const {auth} = useContext(AuthContext)
  
  return (
    <Switch>
      <Route path="/info" exact>
        <InfoPage/>
      </Route>
      <Route path="/masters">
        <MastersPage/>
      </Route>
      <Route path="/login" exact>
        <AuthPage/>
      </Route>
      <Route path="/user" exact>
        UserPage
      </Route>
      { currentUser?.isAdmin && <Route path="/admin" exact>
          <AdminPage/>
        </Route>
      }
      <Redirect to = "/info"/>
    </Switch>
  ) 
}

export default Routes;
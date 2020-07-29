import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AdminPage from './pages/AdminPage/AdminPage';
import AuthPage from './pages/AuthPage/AuthPage';
import MastersPage from './pages/MastersPage/MastersPage';

export const useRoutes = (currentUser) => {
  return (
    <Switch>
      <Route path="/info" exact>
        <div>info page here</div>
      </Route>
      <Route path="/masters" exact>
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

export default useRoutes;
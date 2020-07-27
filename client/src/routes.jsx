import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AdminPage from './pages/adminPage';
import AuthPage from './pages/authPage';
import MastersPage from './pages/mastersPage';

// { name:'Info', path:'/info'},
// { name:'Find master', path:'/masters'},
// { name:'Login', path:'/login'},
// { name:'Administration', path:'/admin'}


export const useRoutes = (currentUser) => {
  return (
    <Switch>
      <Route path="/info" exact>
        <div>info page here</div>
        {/* <InfoPage/> */}
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
      {currentUser?.isAdmin && <Route path="/admin" exact>
        <AdminPage/>
      </Route>}
      <Redirect to = "/info"/>
    </Switch>
  ) 
}

export default useRoutes;
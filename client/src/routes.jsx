import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AdminPage from './pages/adminPage';
import AuthPage from './pages/authPage';
import OrderPage from './pages/orderPage';

export const useRoutes = (isAuthenticated) => {
  if( isAuthenticated ){
    return (
      <Switch>
        <Route path="/adm" exact>
          <AdminPage/>
        </Route>
        <Route path="/auth" exact>
          <AuthPage/>
        </Route>
        <Route path="/order" exact>
          <OrderPage/>
        </Route>
        <Redirect to = "/order"/>
      </Switch>
    ) 
  } else {
    return (
      <Switch>
        <Route path="/auth" exact>
          <AuthPage/>
        </Route>
        <Route path="/order" exact>
          <OrderPage/>
        </Route>
        {/* <Redirect to = "/order"/> */}
        <Redirect to = "/auth"/>

      </Switch>
    ) 
  }
}

export default useRoutes;
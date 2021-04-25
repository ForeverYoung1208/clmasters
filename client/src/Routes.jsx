import React from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';

import AdminPage from './pages/AdminPage/AdminPage';
import AuthPage from './pages/AuthPage/AuthPage';
import MastersPage from './pages/MastersPage/MastersPage';
import InfoPage from './pages/InfoPage/InfoPage';
import withCurrentUser from './HOC/withCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { redirectionDone } from './store/actions/main';

const Routes = (props) => {
  const { currentUser } = props
  const history = useHistory()
  const redirectUrl = useSelector(({ main: {redirectUrl}}) => redirectUrl )
  const dispatch = useDispatch()

  useEffect(() => {
    if (redirectUrl) {
      history.push(redirectUrl)  
      dispatch(redirectionDone())
    }

  },[redirectUrl, dispatch, history])

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
      { currentUser?.isAdmin && <Route path="/admin" >
          <AdminPage/>
        </Route>
      }

      {/* uncomment for testing unauthorized access cases: */}
      {/* { <Route path="/admin" >
          <AdminPage/>
        </Route>
      } */}
      
      <Redirect to = "/info"/>
    </Switch>
  ) 
}

export default withCurrentUser(Routes);
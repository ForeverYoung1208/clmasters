import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const {currentUser, login, logout} = useAuth();
  return(
    <AuthContext.Provider value={  {auth:{currentUser, login, logout}}  }>
      {props.children}
    </AuthContext.Provider>
  )
};



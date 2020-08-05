import { useState, useEffect } from 'react';
import { LS } from "../shared/js/ls";
export const useAuth = () => {
  
  const [currentUser, setCurrentUser] = useState()

  const login = (user) => {
    LS.setItem('userData', user);
    setCurrentUser(user)
  };

  const logout = () =>{
    setCurrentUser(null)
    LS.removeItem('userData')
  }

  useEffect(()=>{
    const user = LS('userData')
    user && user.token && setCurrentUser(user)
  }, []) 

  return( {currentUser, login, logout} )
};
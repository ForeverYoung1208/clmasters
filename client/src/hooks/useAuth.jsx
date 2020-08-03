import { useState, useEffect } from 'react';
export const useAuth = () => {
  
  const [currentUser, setCurrentUser] = useState()

  const login = (user) => {
    localStorage.setItem('userData', JSON.stringify(user));
    setCurrentUser(user)
  };

  const logout = () =>{
    setCurrentUser(null)
    localStorage.removeItem('userData')
  }

  useEffect(()=>{
    const userData = localStorage.getItem('userData')
    if(userData!=='undefined'){
      const user = JSON.parse( userData )
      user && user.token && setCurrentUser(user)
    }

  }, []) 

  return( {currentUser, login, logout} )
};
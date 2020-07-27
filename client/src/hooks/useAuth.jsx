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
    const user = JSON.parse( localStorage.getItem('userData') )
    if (user&&user.token){
      setCurrentUser(user)
    }
  }, [setCurrentUser]) 

  return( {currentUser, login, logout} )
};
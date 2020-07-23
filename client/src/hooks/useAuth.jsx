import { useState, useEffect } from 'react';
export const useAuth = () => {
  
  const [currentUser, setCurrentUser] = useState({
    id:null,
    name:null,
    email:null,
    token:null
  })

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
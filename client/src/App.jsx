import React, { useState } from 'react';
import './App.scss';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/contexts';



function App() {
  const routes = useRoutes(false);

  
  const [currentUser, setCurrentUser] = useState({
    id:null,
    name:null,
    token:null
  })
  
  
  return (
    <AuthContext.Provider value={ {auth:{currentUser, setCurrentUser}} }>
    
      <div className = 'app-wrapper'> 
        <div className='app-toolbar'> toolbar </div>
        <div className="app-content">
          {'current user:' + JSON.stringify(currentUser.email)}
        <BrowserRouter>
          {routes}
        </BrowserRouter>
        </div>
        <footer className="app-footer"> footer here </footer>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

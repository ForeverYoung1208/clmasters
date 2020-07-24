import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/contexts';

import { useRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import Header from './components/header';

function App() {

  const routes = useRoutes(false);

  const {currentUser, login, logout} = useAuth();
 
  return (
    <AuthContext.Provider value={ {auth:{currentUser, login, logout}} }>
    
      <div className = 'app'> 
        <div className='app__header'> 
          <Header/>
        </div>
        <div className="app__content">
          {/* {'current user:' + (currentUser ? JSON.stringify(currentUser.email) : '')} */}
        <BrowserRouter>
          {routes}
        </BrowserRouter>
        </div>
        <footer className="app__footer"> By Ihor S., 2020 </footer>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

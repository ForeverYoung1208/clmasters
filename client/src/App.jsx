import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/contexts';

import { useRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import Header from './components/header';

function App() {

  const {currentUser, login, logout} = useAuth();
  const routes = useRoutes(currentUser);
  
  return (
    <AuthContext.Provider value={  {auth:{currentUser, login, logout}}  }>
      <div className = 'app'> 
          <BrowserRouter>
            <div className='app__header'> 
              <Header/>
            </div>
            <div className="app__content">
                {routes}
            </div>
            <footer className="app__footer"> 
              By Ihor S., 2020 
            </footer>
          </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

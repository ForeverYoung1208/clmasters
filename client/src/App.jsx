import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/contexts';

import { useRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import Header from './components/header';

function App() {

  const routes = useRoutes(false);

  
  // const [currentUser, setCurrentUser] = useState({
  //   id:null,
  //   name:null,
  //   token:null
  // })
  const {currentUser, login, logout} = useAuth();
 
  return (
    <AuthContext.Provider value={ {auth:{currentUser, login, logout}} }>
    
      <div className = 'app-wrapper'> 
        <div className='app-header'> 
          <Header/>
        </div>
        <div className="app-content">
          {/* {'current user:' + (currentUser ? JSON.stringify(currentUser.email) : '')} */}
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

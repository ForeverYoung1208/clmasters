import React from 'react';
import AuthPage from "./pages/authPage";
import './App.scss';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';



function App() {
  const routes = useRoutes(false);

  return (
    <div className = 'app-wrapper'> 
      <div className='app-toolbar'> toolbar </div>
      <div className="app-content">
      <BrowserRouter>
        {routes}
      </BrowserRouter>
      </div>
      <footer className="app-footer"> footer here </footer>
    </div>
  );
}

export default App;

import React, { useContext } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

import { Routes } from './Routes';
import { Header } from './components/Header/Header';
import { GlobalDataProvider, GlobalDataContext } from './context/globalDataContext';

function App() {
  const {data,setData} = useContext(GlobalDataContext);
  console.log(data, setData);
  
  return (
    <AuthProvider>
        <div className = 'app'> 
            <BrowserRouter>
              <div className='app__header'> 
                <Header/>
              </div>
              <div className="app__content">
                <Routes/>
              </div>
              <footer className="app__footer"> 
                By Ihor S., 2020 
              </footer>
            </BrowserRouter>
        </div>
    </AuthProvider>
  );
}

export default App;

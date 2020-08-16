import React, { useContext } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

import { Routes } from './Routes';
import { Header } from './components/Header/Header';
import { GlobalDataContext } from './context/globalDataContext';
import { useEffect } from 'react';
import { useAPI } from './hooks/useAPI';

function App() {
  const {globalData, setGlobalData} = useContext(GlobalDataContext);
  const {API, isLoading} = useAPI({env:process.env.NODE_ENV})
  useEffect(()=>{
    API.getVoc().then(({message, voc}) => {
      console.log('[voc]',message, voc);
      setGlobalData({voc})
    })
  },[])

  
  return (
    <AuthProvider>
        <div className = 'app'> 
            <BrowserRouter>
              <div className='app__header'> 
                <Header/>
              </div>
              {isLoading 
                ? <div className="app__content"> Data is Loading ... Nice loader must be here...  </div>
                : <div className="app__content"> <Routes/> </div>
              }
              <footer className="app__footer"> 
                By Ihor S., 2020 
              </footer>
            </BrowserRouter>
        </div>
    </AuthProvider>
  );
}

export default App;

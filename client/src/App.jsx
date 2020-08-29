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
  const {setGlobalData} = useContext(GlobalDataContext);
  const {API, isLoading} = useAPI({env:process.env.NODE_ENV})

  useEffect(()=>{
    try {
      async function fetchVoc(){
        const{message, voc} = await API.getVoc()
        setGlobalData({voc})
      }
      fetchVoc()      
    } catch (error) {
      setGlobalData({error})
    }
    
    // eslint-disable-next-line
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

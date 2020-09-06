import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AuthProvider } from './context/authContext'
import { Routes } from './Routes'
import { Header } from './components/Header/Header'
import { fetchVoc } from './store/actions/voc'

import './App.scss'

function App() {

  const dispatch = useDispatch();
  const { loaders } = useSelector(state => state.main)
  const isLoading = loaders?.voc

  useEffect(() => {
    dispatch(fetchVoc())
    // eslint-disable-next-line
  }, [])
  
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

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header/Header'
import Routes from './Routes'
import { LS } from './shared/js/ls'
import { authSetCurrentUser } from './store/actions/auth'

import { apiAutoLoginUser } from './shared/js/api/auth'

import './App.scss'

function App() {

  const dispatch = useDispatch();
  const { loaders } = useSelector(state => state.main)
  const isLoading = loaders?.vocabluaries

  useEffect(() => {
    let oldUser = LS('user')
    
    // can't use async/await inside useEffect hook 
    apiAutoLoginUser(oldUser).then((user) => {
      user && dispatch(authSetCurrentUser(user))
    })
     
  }, [dispatch])


  return (
    <div className='app'>
      <BrowserRouter>
        <div className='app__header'>
          <Header />
        </div>
        {isLoading
          ? <div className="app__content"> Data is Loading ...   </div>
          : <div className="app__content"> <Routes /> </div>
        }
        <footer className="app__footer">
          By Ihor S., 2020
              </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

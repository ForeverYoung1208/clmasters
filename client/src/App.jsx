import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header/Header'
import Routes from './Routes'
import { fetchVoc } from './store/actions/voc'
import { LS } from './shared/js/ls'
import { authAutologinUser } from './store/actions/auth'


import './App.scss'

function App() {

  const dispatch = useDispatch();
  const { loaders } = useSelector(state => state.main)
  const isLoading = loaders?.voc

  useEffect(() => {
    dispatch(fetchVoc())
    const oldUser = LS('user')
    oldUser && dispatch(authAutologinUser(oldUser))

    // eslint-disable-next-line
  }, [])
  
  return (
    <div className='app'>
      <BrowserRouter>
        <div className='app__header'>
          <Header />
        </div>
        {isLoading
          ? <div className="app__content"> Data is Loading ... Nice loader must be here...  </div>
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

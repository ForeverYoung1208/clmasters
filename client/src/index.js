import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalDataProvider } from './context/globalDataContext';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';


import App from './App';
import rootReducer from './store/reducers/rootReducer';

import './index.scss';

// console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
// console.log('process.env.REACT_APP_PRODUCTION_URL:', process.env.REACT_APP_PRODUCTION_URL);
// console.log('process.env.REACT_APP_DEVELOPMENT_URL:', process.env.REACT_APP_DEVELOPMENT_URL);

const composeEnhancers =
  typeof window === 'object' &&  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)


ReactDOM.render(
  <GlobalDataProvider> 
		<Provider store={store}>
      <App />
    </Provider>
  </GlobalDataProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

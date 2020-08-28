import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GlobalDataProvider } from './context/globalDataContext';

// console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
// console.log('process.env.REACT_APP_PRODUCTION_URL:', process.env.REACT_APP_PRODUCTION_URL);
// console.log('process.env.REACT_APP_DEVELOPMENT_URL:', process.env.REACT_APP_DEVELOPMENT_URL);

ReactDOM.render(
  <GlobalDataProvider> 
    <App />
  </GlobalDataProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

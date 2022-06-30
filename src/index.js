import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { applyMiddleware, createStore } from 'redux';
import searchReducer from './Reducers';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Info from './Info';




const asyncFuncMiddleware = storeAPI => next => action => {
  if(typeof action == 'function'){
    return action(storeAPI.dispatch, storeAPI.getState)
  }

  return next(action)
}

const middlewareEnhancer = applyMiddleware(asyncFuncMiddleware)
const store = createStore(searchReducer, middlewareEnhancer)


const theme = createTheme({
  palette: {
    primary: {
      main: '#dc1a28',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/info/:mid" element={<Info />} />
      </Routes>
      </BrowserRouter>
      </Provider>

    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

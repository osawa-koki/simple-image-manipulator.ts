import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

import './index.scss';
import Settings from './Common/Settings';

import Root from './Pages/Root';
import Resize from './Pages/Resize';
import NotFound from './Pages/NotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={`${Settings.ROOT_PATH}/`} element={<Root />} />
        <Route path={`${Settings.ROOT_PATH}/resize`} element={<Resize />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

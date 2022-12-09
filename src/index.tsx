import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import Editor from './Editor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Editor></Editor>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import MainRouter from './MainRouter';

ReactDOM.render(
  <Router>
    <MainRouter />
  </Router>,
  document.getElementById('root')
);

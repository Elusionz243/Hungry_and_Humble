import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';

export default function MainRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-us" element={<About />} />
      </Routes>
    </div>
  );
}
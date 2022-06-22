import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';
import FullProduct from './pages/FullProduct';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<FullProduct />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

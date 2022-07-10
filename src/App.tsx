import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './scss/app.scss';
import DefaultLayout from './layouts/DefaultLayout';


// use react-loadable package for server side rendering
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullProduct = React.lazy(() => import(/* webpackChunkName: "FullProduct" */ './pages/FullProduct'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={
          <Suspense fallback={<div>Загрузка...</div>}>
            <Cart />
          </Suspense>
        } />
        <Route path="/product/:id" element={
          <Suspense fallback={<div>Загрузка...</div>}>
            <FullProduct />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<div>Загрузка...</div>}>
            <NotFound />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;

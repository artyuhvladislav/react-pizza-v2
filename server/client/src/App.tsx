import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import Auth from './pages/Auth';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Suspense fallback={<div>loading ...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/items/:id" element={<FullPizza />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;

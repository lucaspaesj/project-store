import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/project-store" component={ Home } />
        <Route path="/project-store/cart" component={ Cart } />
        <Route path="/project-store/details/:id" component={ Details } />
        <Route path="/project-store/checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

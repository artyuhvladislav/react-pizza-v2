import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Empty basket <span>😕</span>
      </h2>
      <p>
        Probably you didn't order pizzas yet
        <br />
        To order pizza go to main page
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};

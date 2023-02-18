import React from 'react';
import { Link } from 'react-router-dom';

export const Auth = () => {
  return (
    <Link to="/auth">
      <button className="button button--auth">Sign in</button>
    </Link>
  );
};

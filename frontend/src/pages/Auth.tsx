import clsx from 'clsx';
import React from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const Auth = () => {
  const [authState, setAuthState] = React.useState(false);
  const handleAuthState = (authType: boolean) => {
    setAuthState(authType);
  };
  return (
    <div className="form">
      <header className="form-header">
        <button
          className={clsx('form-header__button button', !authState && 'form-header__button_active')}
          onClick={() => handleAuthState(false)}>
          sign up
        </button>
        <button
          className={clsx('form-header__button button', authState && 'form-header__button_active')}
          onClick={() => handleAuthState(true)}>
          login
        </button>
      </header>
      <div className="form-content">{authState ? <LoginForm /> : <SignUpForm />}</div>
    </div>
  );
};

export default Auth;

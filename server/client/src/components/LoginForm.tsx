import React from 'react';

const LoginForm = () => {
  const EMAIL_TYPE = 'email';
  const PASSWORD_TYPE = 'password';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleInput = (inputType: string, value: string) => {
    if (EMAIL_TYPE === inputType) {
      setEmail(value);
    } else if (PASSWORD_TYPE === inputType) {
      setPassword(value);
    }
  };

  return (
    <form className="form-wrapper">
      <label className="form-wrapper__label" htmlFor={EMAIL_TYPE}>
        email
      </label>
      <input
        onChange={({ target }) => handleInput(target.type, target.value)}
        className="form-wrapper__input"
        type={EMAIL_TYPE}
        id={EMAIL_TYPE}
        value={email}
        placeholder="enter your email"
      />
      <label className="form-wrapper__label" htmlFor={PASSWORD_TYPE}>
        password
      </label>
      <input
        onChange={({ target }) => handleInput(target.type, target.value)}
        className="form-wrapper__input"
        type={PASSWORD_TYPE}
        id={PASSWORD_TYPE}
        value={password}
        placeholder="enter your password"
      />
    </form>
  );
};

export default LoginForm;

import React from 'react';
import { clsx } from 'clsx';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import AuthService from '../services';
import { loginSchema } from './../schemas/index';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/slice';
import { useNavigate } from 'react-router-dom';
import { authSelector } from '../redux/auth/selectors';
// const LoginForm = () => {
//   const EMAIL_TYPE = 'email';
//   const PASSWORD_TYPE = 'password';

//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const handleInput = (inputType: string, value: string) => {
//     if (EMAIL_TYPE === inputType) {
//       setEmail(value);
//     } else if (PASSWORD_TYPE === inputType) {
//       setPassword(value);
//     }
//   };

//   return (
//     <form className="form-wrapper">
//       <label className="form-wrapper__label" htmlFor={EMAIL_TYPE}>
//         email
//       </label>
//       <input
//         onChange={({ target }) => handleInput(target.type, target.value)}
//         className="form-wrapper__input"
//         type={EMAIL_TYPE}
//         id={EMAIL_TYPE}
//         value={email}
//         placeholder="enter your email"
//       />
//       <label className="form-wrapper__label" htmlFor={PASSWORD_TYPE}>
//         password
//       </label>
//       <input
//         onChange={({ target }) => handleInput(target.type, target.value)}
//         className="form-wrapper__input"
//         type={PASSWORD_TYPE}
//         id={PASSWORD_TYPE}
//         value={password}
//         placeholder="enter your password"
//       />
//     </form>
//   );
// };
interface FormikValues {
  email: string;
  password: string;
}
const LoginForm = () => {
  const EMAIL_TYPE = 'email';
  const PASSWORD_TYPE = 'password';
  const isLogged = React.useRef(false);
  const { email } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLogged) {
      window.localStorage.setItem('user-auth-email', JSON.stringify(email));
    }
    isLogged.current = true;
  });

  const [errorMessage, setErrorMessage] = React.useState('');

  const loginHandler = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      if (response.status === 200) {
        dispatch(login(email));
        setErrorMessage('');
        navigate('/');
      }
    } catch (e: any) {
      setErrorMessage(e.response?.data?.message);
      console.log(e.response?.data?.message);
    }
  };

  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    const { email, password } = values;
    const response = await loginHandler(email, password);
    formikHelpers.resetForm();
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  }: FormikProps<FormikValues> = useFormik<FormikValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">
      <label
        className={clsx(
          errors.email && touched.email && 'form-wrapper__label_error',
          'form-wrapper__label',
        )}
        htmlFor={EMAIL_TYPE}>
        email
      </label>
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        className={clsx(
          errors.email && touched.email && 'form-wrapper__input_error',
          'form-wrapper__input',
        )}
        type="email"
        id={EMAIL_TYPE}
        value={values.email}
        placeholder="enter your email"
      />
      {errors.email && touched.email && <p className="input-text-error">{errors.email}</p>}
      <label
        className={clsx(
          errors.password && touched.password && 'form-wrapper__label_error',
          'form-wrapper__label',
        )}
        htmlFor={PASSWORD_TYPE}>
        password
      </label>
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        className={clsx(
          errors.password && touched.password && 'form-wrapper__input_error',
          'form-wrapper__input',
        )}
        type="string"
        id={PASSWORD_TYPE}
        value={values.password}
        placeholder="enter your password"
      />
      {errors.password && touched.password && <p className="input-text-error">{errors.password}</p>}

      {errorMessage && <p className="form-wrapper__error">{errorMessage}</p>}
      <button
        disabled={isSubmitting}
        className={clsx(
          isSubmitting && 'form-wrapper__submit_submitted',
          'form-wrapper__submit button',
        )}
        type="submit">
        {isSubmitting ? 'submitted' : 'submit'}
      </button>
    </form>
  );
};

export default LoginForm;

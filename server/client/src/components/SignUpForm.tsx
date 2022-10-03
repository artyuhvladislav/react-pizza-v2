import { clsx } from 'clsx';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import React from 'react';
import $api from '../http';
import AuthService from '../services';
import { signUpSchema } from './../schemas/index';

interface FormikValues {
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpForm = () => {
  const EMAIL_TYPE = 'email';
  const PASSWORD_TYPE = 'password';
  const CONFIRM_PASSWORD_TYPE = 'confirmPassword';

  const registration = async (email: string, password: string) => {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      // this.setAuth(true);
      // this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };

  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    const { email, password } = values;
    $api.post('/registration', registration(email, password));
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
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
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
      <label
        className={clsx(
          errors.confirmPassword && touched.confirmPassword && 'form-wrapper__label_error',
          'form-wrapper__label',
        )}
        htmlFor={CONFIRM_PASSWORD_TYPE}>
        Confirm password
      </label>
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        className={clsx(
          errors.confirmPassword && touched.confirmPassword && 'form-wrapper__input_error',
          'form-wrapper__input',
        )}
        type="string"
        id={CONFIRM_PASSWORD_TYPE}
        value={values.confirmPassword}
        placeholder="enter your password"
      />
      {errors.confirmPassword && touched.confirmPassword && (
        <p className="input-text-error">{errors.confirmPassword}</p>
      )}
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

export default SignUpForm;

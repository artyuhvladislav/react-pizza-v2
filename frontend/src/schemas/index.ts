import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
    email: yup.string().email("please enter a valid email").required("required"),
    password: yup.string().min(3, "min length 3 symbols").max(12, "max length 12 symbols").required("required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "passwords must match").required("required"),
})

export const loginSchema = yup.object().shape({
    email: yup.string().email("please enter a valid email").required("required"),
    password: yup.string().min(3, "min length 3 symbols").max(12, "max length 12 symbols").required("required"),
})
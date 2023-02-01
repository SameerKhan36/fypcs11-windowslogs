import * as yup from 'yup';

export const SignupValidationSchema = yup.object({
    userName: yup
    .string('')
    .required('User name is required'),
    email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
    passWord: yup
    .string()
    .required('Password is required'),
    // confirm_password: yup
    // .string()
    // .required('Confirm Password is required'),
    confirmPassword: yup
    .string().oneOf([yup.ref('passWord'), null], 'Password must match').required(),
});

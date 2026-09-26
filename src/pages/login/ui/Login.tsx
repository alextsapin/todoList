import React, { JSX } from 'react';

import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAppDispatch } from '@/App';
import { Error } from '@/components/Error/Error';
import { PASSWORD_LENGTH } from '@/shared/constants';

import { login } from '../model/loginSlice';

import css from './login.module.scss';

type FormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

const loginSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    password: yup.string().min(PASSWORD_LENGTH.MIN).max(PASSWORD_LENGTH.MAX).required(),
});

export const Login = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: process.env.REACT_APP_API_EMAIL || '',
            password: process.env.REACT_APP_API_PASSWORD || '',
            rememberMe: false,
        },
        validationSchema: loginSchema,
        onSubmit: (values: FormValuesType, actions) => {
            dispatch(login(values));
            actions.resetForm();
        },
    });

    return (
        <Container fixed>
            <form onSubmit={formik.handleSubmit} className={css.form}>
                <TextField
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    label="Email"
                    size="small"
                    className={css.field}
                    error={!!(formik.errors.email && formik.touched.email)}
                />

                <TextField
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    label="Password"
                    size="small"
                    className={css.field}
                    error={!!(formik.errors.password && formik.touched.password)}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            name="rememberMe"
                            value={formik.values.rememberMe}
                            onChange={formik.handleChange}
                        />
                    }
                    label="Запомнить меня"
                />

                <Button
                    type="submit"
                    variant="contained"
                    className={css.button}
                    disabled={formik.isSubmitting}
                >
                    Отправить
                </Button>
            </form>
            <Error />
        </Container>
    );
};

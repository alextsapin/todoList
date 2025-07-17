import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Error } from '../../components/Error/Error';

import { useAppDispatch } from '../../shared/hooks/hooks';
import { login } from './login.reducer';
import css from './login.module.scss';

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

const loginSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    password: yup.string().min(6).max(12).required()
})

export const Login = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: process.env.REACT_APP_API_EMAIL || '',
            password: process.env.REACT_APP_API_PASSWORD || '',
            rememberMe: false
        },
        validationSchema: loginSchema,
        onSubmit: (values: FormValuesType, actions) => {
            dispatch(login(values));
            actions.resetForm();
        }
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
                    label='Email'
                    size="small"
                    className={css.field}
                    error={formik.errors.email && formik.touched.email ? true : false}
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
                    error={formik.errors.password && formik.touched.password ? true : false}
                />

                <FormControlLabel control={
                    <Checkbox name="rememberMe" value={formik.values.rememberMe} onChange={formik.handleChange}/>
                    } label="Запомнить меня"/>

                <Button type="submit" variant='contained' className={css.button} disabled={formik.isSubmitting}>Отправить</Button>
            </form>
            <Error/>
        </Container>
    )
}

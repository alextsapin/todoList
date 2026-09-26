/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import { Img } from 'react-image';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/App';
import { auth, logout } from '@/pages/Login/login.reducer';

import logo from '../assets/logo.png';

import css from './header.module.scss';

export const Header: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const status = useAppSelector(state => state.App.status);
    const isAuthorized = useAppSelector(state => state.login.isAuthorized);

    useEffect(() => {
        dispatch(auth());
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [isAuthorized]);

    return (
        <>
            <AppBar position="static">
                <Container fixed>
                    <div className={css.block}>
                        <NavLink to="/">
                            <Img className={css.logo} src={logo} />
                        </NavLink>
                        {!isAuthorized ? (
                            <Tooltip className={css.cursor} title="Login">
                                <NavLink to="/login" className={css.link}>
                                    <LoginIcon />
                                </NavLink>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                className={css.cursor}
                                onClick={() => dispatch(logout())}
                                title="Logout"
                            >
                                <LogoutIcon />
                            </Tooltip>
                        )}
                    </div>
                </Container>
            </AppBar>
            <div className={css.bar}>
                {status === 'loading' && <LinearProgress color="info" />}
            </div>
        </>
    );
};

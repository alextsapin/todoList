import React, {useEffect} from 'react';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import AppBar from '@mui/material/AppBar';
import {NavLink, useNavigate} from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import {Img} from 'react-image';
import LoginIcon from '@mui/icons-material/Login';
import {auth, logout} from '../Login/login.reducer';
import css from './css.module.scss';
import logo from './logo.png';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const status = useAppSelector(state => state.App.status);
    const isAuthorized = useAppSelector(state => state.login.isAuthorized)

    useEffect(() => {
        dispatch(auth())
    }, [])

    useEffect(() => {
        dispatch(auth())
    }, [isAuthorized])

    useEffect(() => {
        if(isAuthorized) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [isAuthorized])

    return (
        <React.Fragment>
            <AppBar position="static">
                <Container fixed>
                    <div className={css.block}>
                        <NavLink to="/">
                            <Img className={css.logo} src={logo}/>
                        </NavLink>
                        {
                            !   isAuthorized
                            ?   <Tooltip className={css.cursor} title="Login">
                                    <NavLink to="/login" className={css.link}>
                                        <LoginIcon/>
                                   </NavLink>
                                </Tooltip>
                            :   <Tooltip className={css.cursor} onClick={() => dispatch(logout())} title="Logout">
                                    <LogoutIcon/>
                                </Tooltip>
                        }
                    </div>
                </Container>
            </AppBar>
            <div className={css.bar}>
                {status === 'loading' && <LinearProgress color='info'/>}
            </div>
        </React.Fragment>
    )
}

export default Header;
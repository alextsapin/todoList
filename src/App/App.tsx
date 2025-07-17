import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Login } from '../pages/Login/Login';
import { Main } from '../pages/Main/Main';

import '../shared/css/reset.css'
import './app.scss';

export const App = React.memo(() => {
    return (
        <React.Fragment>
            <Header/>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </React.Fragment>
    )
})

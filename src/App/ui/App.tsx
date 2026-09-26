import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Login } from '@/pages/Login/Login';
import { Main } from '@/pages/Main/Main';
import { Header } from '@/widgets/header';

import '../styles/reset.css';
import '../styles/App.scss';

export const App = React.memo(() => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
});

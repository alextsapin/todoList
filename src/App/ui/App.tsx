import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Home } from '@/pages/home';
import { Login } from '@/pages/login';
import { Header } from '@/widgets/header';

import '../styles/reset.css';
import '../styles/App.scss';

export const App = React.memo(() => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
});

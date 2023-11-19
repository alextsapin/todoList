import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Main from '../components/Main/Main';

import './reset.css'
import './App.scss';

type AppType = {
    demo?: boolean
}

const App = React.memo((props: AppType) => {
    return (
        <React.Fragment>
            <Header/>
            <Routes>
                <Route path='/' element={<Main demo={props.demo}/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </React.Fragment>
    )
})

export default App;
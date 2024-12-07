import React from 'react'
import {Routes, Route} from "react-router-dom";
import HomePage from '../components/HomePage';
import NewTransaction from '../transactions/NewTransaction';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element=/>
        </Routes>
    )
}

export default AppRoutes

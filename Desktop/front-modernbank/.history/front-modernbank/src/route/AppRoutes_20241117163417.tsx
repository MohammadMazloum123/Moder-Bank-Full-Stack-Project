import React from 'react'
import {Routes, Route} from "react-router-dom";
import HomePage from '../components/HomePage';
import NewTransaction from '../transactions/NewTransaction.tsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/new-transactions' element={<NewTransaction/>}/>
        </Routes>
    )
}

export default AppRoutes

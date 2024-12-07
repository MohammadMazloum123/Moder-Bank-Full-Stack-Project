import React from 'react'
import {Routes, Route} from "react-router-dom";
import HomePage from '../components/HomePage';
import NewTransaction from '../transactions/NewTransaction.tsx';
import TransactionsHistory from '../transactions/TransactionsHistory.tsx';
import SavingsAccount from '../savings/SavingsAccount.tsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/new-transactions' element={<NewTransaction/>}/>
            <Route path='/transactions-history' element={<TransactionsHistory/>}/>
            <Route path='/savings-account' element={<SavingsAccount/>}/>
            <Route path='/track-expenses' element={<Track}/>
        </Routes>
    )
}

export default AppRoutes

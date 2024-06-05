import React from 'react'
import Breadcrumb from './ui/Breadcrumb';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const DashboardContainer= styled.div`
    padding: 30px;
`

function Dashboard() {
    return (
        <DashboardContainer>
            <Breadcrumb crumbs={[
                { path: '/', label: 'Home' },
                { path: '/signout', label: 'Logout' }
            ]} />
            <h2>Dashboard</h2>
            <ul>
                <li><Link to="/expenses/add">Add Expense</Link></li>
                <li><Link to="/expenses">List All Expenses</Link></li>
            </ul>
        </DashboardContainer>
    )
}

export default Dashboard
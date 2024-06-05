import React from 'react'
import Breadcrumb from './ui/Breadcrumb'

function ExpenseForm() {
    return (
        <>
            <Breadcrumb crumbs={[
                { path: '/', label: 'Home' },
                { path: '/signout', label: 'Logout' }
            ]} />
            <div>ExpenseForm</div>
        </>
    )
}

export default ExpenseForm
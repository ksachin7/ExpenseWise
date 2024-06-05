import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from './ui/Breadcrumb'

function Home() {
    return (
        <>
        <Breadcrumb crumbs={[
            { path: '/', label: 'Home' },
            // { path: '/register', label: 'Register' },
            { path: '/signin', label: 'Login' },
        ]} />
        <div>
            <h1>Home</h1>
            <p>New user? <Link to="/register">Register</Link></p>
        </div>
        </>
    )
}

export default Home
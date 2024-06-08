import React from 'react'
import { Link } from 'react-router-dom'
import Heading from "../components/ui/Heading";
import SignupForm from '../components/auth/RegisterForm'
import Breadcrumb from './ui/Breadcrumb'

function Home() {
    return (
        <>
            <h1>Home</h1>
            <Heading as="h1">new user?</Heading>
            <SignupForm />
            {/* <p>New user? <Link to="/register">Register</Link></p> */}
        </>
    )
}

export default Home;

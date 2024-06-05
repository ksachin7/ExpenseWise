import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';

const Home = () => (
  <div>
    <h2>Home Page</h2>
    <p>new user? 
    <Link to="/register">register</Link></p>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/signin">Login</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

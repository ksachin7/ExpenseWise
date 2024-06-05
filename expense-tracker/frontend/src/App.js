import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Redirect } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import Logout from './components/auth/Logout';
import ExpenseItem from './components/ExpenseItem';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
        <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />} />
        {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        {!isLoggedIn && <Route path="/register" element={<RegisterForm />} />}
        {!isLoggedIn && <Route path="/signin" element={<LoginForm />} />}
        {isLoggedIn && <Route path="/signout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />}
        {isLoggedIn &&  <Route path="/expenses/add" element={<ExpenseForm />} />}
        {isLoggedIn && <Route path="/expenses/:id" element={<ExpenseItem />} />}
        {isLoggedIn && <Route path="/expenses" element={<ExpenseList />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
  );
};

export default App;

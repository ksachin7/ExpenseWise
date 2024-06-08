import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Redirect } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import Logout from './components/auth/Logout';
import ExpenseItem from './components/expenses/ExpenseItem';
import ExpenseList from './components/expenses/ExpenseList';
import Dashboard from './components/pages/Dashboard';
import Home from './components/Home';
import GlobalStyles from './components/styles/GlobalStyles';
import ProtectedRouteContainer from './components/auth/ProtectedRouteContainer';
import { AppLayout } from './components/ui';
import PageNotFound from './components/pages/PageNotFound';
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from './components/context/DarkModeContext';
import Users from './components/pages/users';
import UserProfile from './components/pages/UserProfile';
import SplitBill from './components/pages/SplitBill';

const App = () => {

  return (
    <DarkModeProvider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route element={
            <ProtectedRouteContainer>
              <AppLayout />
            </ProtectedRouteContainer>
          }>
            <Route index element={<Navigate replace to="Dashboard" />} />
            {/* <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signout" element={<Logout setIsLoggedIn={true} />} />
            {/* <Route path="/expenses/add" element={<ExpenseForm />} /> */}
            <Route path="/expenses/:id" element={<ExpenseItem />} />
            <Route path="/expenses" element={<ExpenseList />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            <Route path='/users' element={<Users />} />
            <Route path='/account' element={<UserProfile />} />
            <Route path='/split' element={<SplitBill />} />
          </Route>
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/signin" element={<LoginForm />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={11}
        containerStyle={{ margin: "7px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          }
        }}
        style={{
          fontSize: "14px",
          maxWidth: '500px',
          padding: "16px 24px",
          backgroundColor: 'var(--color-grey-0)',
          color: 'var(--color-grey-700)'
        }}
      ></Toaster>
    </DarkModeProvider>
  );
};

export default App;

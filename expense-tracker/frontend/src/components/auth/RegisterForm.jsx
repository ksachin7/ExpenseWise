import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.8); /* Transparent white background */
  backdrop-filter: blur(5px); /* Apply a blur effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid silver;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Message = styled.div`
  margin-top: 10px;
  color: ${props => (props.error ? 'red' : 'green')};
`;

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate= useNavigate();

  const validateForm = () => {
    let isValid = true;
    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/register', { username, email, password });
      setMessage(response.data);
      setUsername('');
      setEmail('');
      setPassword('');
      navigate("/signin");
    } catch (err) {
      setMessage(err.response.data);
      setError(true);
    }
  };

  return (
    <FormContainer>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {usernameError && <Message error>{usernameError}</Message>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <Message error>{emailError}</Message>}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <Message error>{passwordError}</Message>}
        <Button variation="secondary" size="lg" type="submit">Register</Button>
      </Form>
      {message && <Message error={error}>{message}</Message>}
    </FormContainer>
  );
};

export default RegisterForm;

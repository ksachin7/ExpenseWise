import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from '../ui';

const FullPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-grey-100);
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  background: var(--color-grey-100);
  backdrop-filter: blur(5px);
  box-shadow: var(--shadow-md);
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Suggestions = styled.div`
  margin-top: 10px;
`;

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestedUsernames, setSuggestedUsernames] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/register', data);
      console.log(response.data); 
      navigate('/signin');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          const { message, suggestedUsernames: suggestions } = error.response.data;
          setErrorMessage(message);
          setSuggestedUsernames(suggestions);
        } else if (error.response.status === 400) {
          const { errors: validationErrors } = error.response.data;
          Object.keys(validationErrors).forEach((fieldName) => {
            errors[fieldName] = { message: validationErrors[fieldName] };
          });
        } else {
          setErrorMessage('An error occurred while registering.');
        }
      } else {
        setErrorMessage('An unexpected error occurred while registering.');
      }
    }
  };

  return (
    <FullPageContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Register</Title>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          <Button style={{marginTop: '10px'}} variation="secondary" size="md" type="submit">Register</Button>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {suggestedUsernames.length > 0 && (
            <Suggestions>
              <p>Username suggestions:</p>
                {suggestedUsernames.map((name, index) => (
                  <span key={index}>{name}&nbsp;</span>
                ))}
            </Suggestions>
          )}
        </Form>
      </FormContainer>
    </FullPageContainer>
  );
};

export default RegisterForm;

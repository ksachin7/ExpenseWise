import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Message= styled.span`
    margin: 5px 0;
    color: ${props => props.errors? 'red': 'green'};
    overflow: auto;
`;

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState(false);
    const [msg, setMsg]= useState(null);

    const navigate= useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login', { 
                // mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Handle success (e.g., save token, redirect)
                setMsg('Login successful!')
                navigate("/")
                console.log('Login successful:', data);
            } else {
                const data = await response.text();
                setError(true);
                setMsg(data);
                // Handle error
                console.error('Login failed: ', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <FormContainer>
            <Title>Login</Title>
            <Form onSubmit={handleSubmit}>
                <InputContainer>
                    <Label htmlFor="username">Username:</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Label htmlFor="password">Password:</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </InputContainer>
                {msg&&<Message errors={error}>{msg}</Message>}
                <Button type="submit">Login</Button>
            </Form>
        </FormContainer>
    );
};

export default LoginForm;

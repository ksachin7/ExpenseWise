import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Container } from "../ui";

const FullPageContainer= styled.div`
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
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  margin: auto;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow-md);
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;
const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  z-index: -1;
  /* background-image: url('https://source.unsplash.com/random/800x600');  */
  /* background-image: url('https://unsplash.com/photos/ix_kUDzCczo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGdyYWRpZW50fGVufDB8fHx8MTcxNzYyMjYwMnww&force=true&w=640'); */
  background-size: cover;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const CheckboxContainer = styled.div`
  margin-bottom: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;

const Checkbox = styled.input`
  margin-right: 5px; 
  width: fit-content;
`;

const CheckboxLabel = styled.label`
  font-weight: bold;
  margin-right: 5px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin: 10px 5px 0 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: transparent;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Message = styled.span`
  margin: 5px 0;
  color: ${(props) => (props.errors ? "red" : "green")};
  overflow: auto;
`;

const LinkContainer = styled.div`
  margin-right: 5px;
  text-align: center;
`;

const SignupContainer = styled.div`
  margin-right: 5px;
  padding: 10px;
  text-align: center;
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  // Load rememberMe preference from localStorage on component mount
  useEffect(() => {
    const rememberMePreference =
      localStorage.getItem("rememberMe") === "true";
    setRememberMe(rememberMePreference);
    if (rememberMePreference) {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername || "");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const api = "http://localhost:8080";
      const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle success (e.g., save token, redirect)
        setMsg("Login successful!");
        navigate("/");
        // console.log("Login successful:", data);
        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("rememberMe");
        }
      } else {
        const data = await response.text();
        setError(true);
        setMsg(data);
        // Handle error
        console.error("Login failed: ", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <FullPageContainer>
      {/* <BackgroundVideo autoPlay loop muted>
        <source src="path_to_your_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo> */}
      {/* <BackgroundImg /> */}
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
          <CheckboxContainer>
          <span>
          <CheckboxLabel htmlFor="rememberMe" style={{marginBottom: "auto"}}>Remember me</CheckboxLabel>
              <Checkbox
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
          </span>
          <LinkContainer>
            <Link to="/forgot-password">Forgot Password?</Link>
          </LinkContainer>
          </CheckboxContainer>
          {msg && <Message errors={error}>{msg}</Message>}
          <Button size="lg" type="submit">Login</Button>
          <SignupContainer>
            <Link to="/signup">Sign Up</Link>
          </SignupContainer>
        </Form>
      </FormContainer>
    </FullPageContainer>
  );
};

export default LoginForm;

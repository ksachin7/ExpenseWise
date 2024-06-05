import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Input = ({ type, placeholder, value, onChange }) => {
  return <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default Input;

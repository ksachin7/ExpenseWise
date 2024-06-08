import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import { SiExpensify } from "react-icons/si";

const StyledLogo= styled.div`
  font-size: 2.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Logo() {
  const { isDarkMode } = useDarkMode();
  const LogoIcon = isDarkMode ? <SiExpensify color="silver" /> : <SiExpensify color="grey" />;

  return (
    <StyledLogo>
      {LogoIcon} &nbsp; ExpenseWise
    </StyledLogo>
  );
}

export default Logo;

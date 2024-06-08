import styled, { css } from "styled-components";

const Form = styled.form`
  padding: ${(props) => (props.type === "regular" ? "2.1rem" : "1rem")};
  background-color: ${(props) =>
    props.type === "regular" ? "var(--color-grey-100)" : "transparent"};
  display: ${(props) => (props.type === "regular" ? "block" : "inline-block")};
  border: ${(props) =>
    props.type === "regular"
      ? "1px solid var(--color-grey-300)"
      : "none"};
  border-radius: ${(props) =>
    props.type === "regular" ? "var(--border-radius-md)" : "0"};
  /* width: ${(props) => (props.type === "modal" ? "80rem" : "auto")}; */
  width: 100%;
  overflow: hidden;
  font-size: 1.4rem;
  color: var(--color-grey-700);
  & > * {
    display: block;
    /* margin-bottom: 1rem; */
  }
  & input{
    width: 100%;
  }
  & Button{
    margin-top: 1rem;
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;

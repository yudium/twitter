import styled from "styled-components";

/**
 * Main component
 */
export const Button = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  background-color: rgb(29, 155, 240);
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  min-width: 36px;
  min-height: 36px;
  padding: 0 16px;
  user-select: none;
  border-radius: 9999px;
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  word-wrap: break-word;
  border: 1px solid rgb(0, 0, 0);
  cursor: ${(props) => (props.disabled ? "initial" : "pointer")};
`;

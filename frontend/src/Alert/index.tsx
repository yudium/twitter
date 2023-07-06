import styled from "styled-components";
import React from "react";

interface AlertProps {
  children: React.ReactNode;
  variant: "error";
}

/**
 * Main component
 */
export function Alert(props: AlertProps) {
  return <AlertContainer {...props}>{props.children}</AlertContainer>;
}

/**
 * Styled Component
 */
const AlertContainer: React.FC<AlertProps> = styled.div<AlertProps>`
  background-color: ${(props) => alertColors[props.variant]};
  padding-bottom: 12px;
  padding-top: 12px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 8px;
  color: rgb(231, 233, 234);
  word-wrap: break-word;
`;

const alertColors = {
  error: "rgb(61, 1, 5)",
};

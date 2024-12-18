import { MouseEventHandler } from "react";
import styled from "styled-components";

interface Props {
  title: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ title, type = "button", onClick }: Props) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {title}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: inherit;
  padding: 15px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: inherit;
  transition: all 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_darker};
  }
`;

export default Button;

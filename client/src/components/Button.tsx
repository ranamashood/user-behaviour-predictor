import { MouseEventHandler } from "react";

interface Props {
  title: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ title, type = "button", onClick }: Props) => {
  return (
    <button type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;

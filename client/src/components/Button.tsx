interface Props {
  title: string;
}

const Button = ({ title }: Props) => {
  return <button type="submit">{title}</button>;
};

export default Button;

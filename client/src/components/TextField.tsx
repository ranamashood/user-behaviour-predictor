import styled from "styled-components";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextField = ({ label, name, value, onChange }: Props) => {
  const labelId = label.toLowerCase().replace(/ /g, "-");

  return (
    <StyledTextField>
      <Input
        type="number"
        id={labelId}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      <Label htmlFor={labelId}>{label}</Label>
    </StyledTextField>
  );
};

const StyledTextField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  transition: all 100ms;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: inherit;
  padding: 15px;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: inherit;
  transition: all 100ms;

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
  }

  &:focus + ${Label}, &:valid + ${Label} {
    top: 0;
    font-size: 0.9rem;
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export default TextField;

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextField = ({ label, name, value, onChange }: Props) => {
  const labelId = label.toLowerCase().replace(/ /g, "-");

  return (
    <div>
      <label htmlFor={labelId}>{label}</label>
      <input
        type="text"
        id={labelId}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default TextField;

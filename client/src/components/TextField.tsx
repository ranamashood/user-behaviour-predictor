interface Props {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextField = ({ label, name, onChange }: Props) => {
  const labelId = label.toLowerCase().replace(/ /g, "-");

  return (
    <div>
      <label htmlFor={labelId}>{label}</label>
      <input
        type="text"
        id={labelId}
        name={name}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default TextField;

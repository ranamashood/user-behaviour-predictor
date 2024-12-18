interface Props {
  label: string;
}

const TextField = ({ label }: Props) => {
  const labelId = label.toLowerCase().replace(/ /g, "-");

  return (
    <div>
      <label htmlFor={labelId}>{label}</label>
      <input type="text" id={labelId} />
    </div>
  );
};

export default TextField;

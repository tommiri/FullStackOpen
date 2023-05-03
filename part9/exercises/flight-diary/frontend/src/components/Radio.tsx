type RadioProps = {
  label: string;
  name: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
};

const Radio = ({
  label,
  name,
  value,
  onChange,
  checked,
}: RadioProps) => {
  return (
    <>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        id="radio"
        defaultChecked={checked}
      />
      <label htmlFor="radio">{label}</label>
    </>
  );
};

export default Radio;

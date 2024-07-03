export default function SelectField(props: {
  options: string[] | number[];
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  const { options, label, value, required, onChange } = props;
  return (
    <label className="text-xl my-3">
      {label}
      <select
        required={required}
        className="w-full h-12 text-md bg-white rounded-xl invalid:outline-red-400 outline-gray-300 outline-1 outline px-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

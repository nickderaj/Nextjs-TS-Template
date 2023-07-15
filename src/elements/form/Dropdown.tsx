export interface IDropdown extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
}

const Dropdown: React.FC<IDropdown> = ({ value, setValue, options, ...props }) => {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
      className="w-full h-10 px-3 text-white placeholder:neutral-600 border border-stroke rounded-sm
       bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

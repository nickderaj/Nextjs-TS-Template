import { ChangeEvent } from 'react';

interface ISelect {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
  required?: boolean;
  error?: boolean;
  onChange: (_e: ChangeEvent<HTMLSelectElement>) => void;
}

// Reusable styled select component
export default function Select({ label, name, defaultValue, options, required = false, error = false, onChange }: ISelect) {
  const normalClasses = 'focus:ring-indigo-500 focus:border-indigo-500';
  const errorClasses = 'focus:ring-rose-500 focus:border-rose-500';

  return (
    <div className="flex flex-col mb-4  ">
      <label htmlFor={name} className="mb-1 text-sm">
        {label}
      </label>
      <select
        onChange={onChange}
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`border text-sm focus:outline-none py-1 px-1 rounded ${error ? errorClasses : normalClasses}`}
        required={required}
      >
        {options.map((opt, i) => (
          <option value={opt} key={`${opt} - ${i}`}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

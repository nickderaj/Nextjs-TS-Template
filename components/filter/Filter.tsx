import { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

export default function Filter({ filter, setFilter }: { filter: string; setFilter: Dispatch<React.SetStateAction<string>> }) {
  const [filterInput, setFilterInput] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilter(filterInput);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-9/12 max-w-lg">
      <div className="flex gap-4 justify-center items-center w-full">
        <label className="relative block w-full">
          <input
            onChange={handleChange}
            className="w-full bg-white placeholder:font-italitc border border-purple-400 drop-shadow-md rounded-md py-2 pl-3 pr-10 focus:outline-none"
            placeholder={filter || 'Search'}
            type="text"
          />

          <button type="submit" role="filter-submit-button" className="absolute inset-y-0 right-0 flex items-center pr-3">
            <BiSearchAlt2 />
          </button>
        </label>
      </div>
    </form>
  );
}

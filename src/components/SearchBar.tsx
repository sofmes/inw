import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

export const SearchBar = () => {
	const [query, setQuery] = useState('');

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('検索クエリ:', query); // とりあえずconsole.logしとく
	};

	return (
		<form onSubmit={handleSearch} className='w-72'>
			<div
				className='flex items-center bg-neutral-700 text-white rounded-full shadow-md px-4 py-1
                    hover:bg-neutral-600 focus-within:ring-2 focus-within:ring-gray-400 transition'
			>
				<input
					type='text'
					value={query}
					onChange={e => setQuery(e.target.value)}
					className='bg-transparent outline-none w-full text-white placeholder-gray-400'
				/>
				<button type='submit' className='btn btn-ghost btn-sm'>
					<HiOutlineSearch className='text-white w-5 h-5 hover:text-gray-300 transition' />
				</button>
			</div>
		</form>
	);
};

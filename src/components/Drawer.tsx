import { useContext } from 'react';
import { SelectedItemContext } from './Context';

export function Drawer() {
	const [selectedItem, _] = useContext(SelectedItemContext);

	return (
		<div
			id='drawer'
			className={`absolute top-0 left-0 z-20 h-screen w-[500px] p-10 rounded-r-2xl text-white bg-[rgb(43,43,43)]
				transform transition-transform duration-200 ease-in-out
				${selectedItem ? 'translate-x-0' : '-translate-x-full'}`}
		>
			{selectedItem ? (
				<>
					<h2 className='text-2xl'>{selectedItem.label}</h2>
					<button
						className='absolute bottom-10 right-10 px-6 py-2 rounded-lg
							bg-[rgb(84,84,84)] hover:bg-[rgb(100,100,100)]
							transition-colors duration-200'
					>
						採用する
					</button>
				</>
			) : null}
		</div>
	);
}

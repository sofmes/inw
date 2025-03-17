import { useContext } from 'react';
import { SelectedItemContext } from './Context';

export function Drawer() {
	const [selectedItem, _] = useContext(SelectedItemContext);

	return (
		<div
			id='drawer'
			className='absolute top-0 left-0 z-20 h-screen w-[500px] p-10 rounded-r-2xl bg-base-300'
			hidden={!selectedItem}
		>
			{selectedItem ? (
				<>
					<h2 className='text-2xl'>{selectedItem.label}</h2>
				</>
			) : null}
		</div>
	);
}

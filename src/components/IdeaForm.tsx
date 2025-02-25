import type React from 'react';

interface IdeaFormProps {
	isOpen: boolean;
	onClose: () => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ isOpen, onClose }) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50
        transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
		>
			<div
				className={`bg-neutral-800 text-white p-8 rounded-2xl shadow-lg w-[600px]
          transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-90 opacity-0'}`}
			>
				<h2 className='text-2xl font-bold mb-6'>アイデア投稿</h2>

				{/* タイトル */}
				<label className='block text-lg mb-2'>タイトル</label>
				<input
					type='text'
					className='w-full p-2 bg-neutral-700 rounded-lg mb-4 text-lg'
					placeholder='アイデアのタイトルを入力'
				/>

				{/* 説明 */}
				<label className='block text-lg mb-2'>説明</label>
				<textarea
					className='w-full p-2 bg-neutral-700 rounded-lg mb-4 text-lg'
					rows={4}
					placeholder='アイデアの説明を入力'
				></textarea>

				{/* タグ */}
				<label className='block text-lg mb-2'>タグ</label>
				<input
					type='text'
					className='w-full p-2 bg-neutral-700 rounded-lg mb-6 text-lg'
					placeholder='#タグを入力'
				/>

				{/* ボタン */}
				<div className='flex justify-end gap-4'>
					<button
						onClick={onClose}
						className='bg-gray-600 px-6 py-2 rounded-lg text-lg hover:bg-gray-500 transition'
					>
						キャンセル
					</button>
					<button className='bg-blue-500 px-6 py-2 rounded-lg text-lg hover:bg-blue-400 transition'>
						投稿
					</button>
				</div>
			</div>
		</div>
	);
};

export default IdeaForm;

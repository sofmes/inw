import { useState } from 'react';

export const AccountMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='relative'>
			<div className='dropdown dropdown-end'>
				{/* アバター（クリックでメニュー表示） */}
				<button
					type='button'
					className='btn btn-ghost btn-circle avatar'
					onClick={() => setIsOpen(!isOpen)}
				>
					<div className='w-10 rounded-full'>
						<img src='src/assets/avatar.png' alt='User Avatar' />
					</div>
				</button>

				{/* メニュー */}
				<ul
					className={`menu menu-sm dropdown-content mt-3 p-2 shadow bg-neutral-700 text-white rounded-box w-48
            transform transition-all duration-300 ease-out
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
				>
					<li>
						<button onClick={() => setIsOpen(false)}>
							プロフィール
						</button>
					</li>
					<li>
						<button onClick={() => setIsOpen(false)}>
							テーマ設定
						</button>
					</li>
					<li>
						<button onClick={() => setIsOpen(false)}>
							ログアウト
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

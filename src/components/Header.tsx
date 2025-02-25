import AccountMenu from './AccountMenu';
import SearchBar from './SearchBar';

const Header = () => {
	return (
		<header className='fixed top-0 left-0 w-full text-white flex items-center justify-end px-2 py-2 z-50'>
			<div className='flex items-center mr-auto bg-neutral-700 py-2 px-4 rounded-lg'>
				<img src='src/assets/logo.png' className='h-8 w-auto mr-3' />
				<h1 className='text-lg'>アイディアネットワーク</h1>
			</div>

			<div className='flex items-center gap-x-2 mr-4'>
				<SearchBar />
				<AccountMenu />
			</div>
		</header>
	);
};

export default Header;

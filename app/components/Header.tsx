import { AccountMenu } from "./AccountMenu";
import { SearchBar } from "./SearchBar";

export const Header = () => {
	return (
		<header className="z-20 fixed top-0 left-0 w-full flex justify-between px-2 py-2 pointer-events-none">
			<div className="bg-neutral-700 py-2 px-4 rounded-lg pointer-events-auto">
				<img
					src="/assets/logo.png"
					className="h-8 w-auto mr-3 inline-block"
					alt="アイディアネットワーク"
				/>
				<h1 className="text-lg inline-block text-white">
					アイディアネットワーク（プレビュー）
				</h1>
			</div>

			<div className="flex items-center gap-x-2 pointer-events-auto">
				<SearchBar />
				<AccountMenu />
			</div>
		</header>
	);
};

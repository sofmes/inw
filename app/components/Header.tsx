import { AccountMenu } from "./AccountMenu";
import { SearchBar } from "./SearchBar";

export const Header = () => {
	return (
		<header className="z-20 fixed top-0 left-0 w-full pointer-events-none">
			{/* ヘッダーの背景 */}
			<div className="bg-neutral-800/80 backdrop-blur-sm w-full h-14 absolute top-0 left-0" />

			{/* ヘッダーコンテンツ */}
			<div className="relative flex justify-between items-center px-2 md:px-4 h-14">
				{/* ロゴ部分 */}
				<div className="pointer-events-auto flex items-center h-full">
					<img
						src="/assets/logo.png"
						className="h-10 w-auto"
						alt="アイディアネットワーク"
					/>
					<h1 className="text-white text-xl md:text-2xl ml-2">
						アイディアネットワーク
					</h1>
				</div>

				{/* 右側のコントロール */}
				<div className="flex items-center gap-x-2 pointer-events-auto h-full">
					<SearchBar />
					<div className="flex items-center h-full">
						<AccountMenu />
					</div>
				</div>
			</div>
		</header>
	);
};

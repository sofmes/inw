import { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// 検索バーが開いたら自動的にフォーカス
	useEffect(() => {
		if (isSearchOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isSearchOpen]);

	useEffect(() => {
		// ESCキーのイベントリスナー
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isSearchOpen) {
				setIsSearchOpen(false);
			}
		};

		// 検索バーが開いている時のみイベントリスナーを追加
		if (isSearchOpen) {
			document.addEventListener("keydown", handleEscKey);
			// 自動フォーカス
			inputRef.current?.focus();
		}

		// クリーンアップ
		return () => {
			document.removeEventListener("keydown", handleEscKey);
		};
	}, [isSearchOpen]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("検索クエリ:", query);
		setIsSearchOpen(false);
	};

	return (
		<>
			{/* 検索アイコン */}
			<button
				type="button"
				className="h-9 aspect-square flex items-center justify-center"
				onClick={() => setIsSearchOpen(true)}
			>
				<HiOutlineSearch className="text-white w-6 h-6" />
			</button>

			{/* フルスクリーン検索オーバーレイ */}
			<div
				className={`
					fixed inset-0 z-50 bg-neutral-900/95 backdrop-blur-sm
					transition-opacity duration-300
					${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
				`}
			>
				{/* 検索コンテナ */}
				<div className="w-full h-14 bg-neutral-800 shadow-lg">
					<div className="max-w-7xl mx-auto h-full px-4">
						<form
							onSubmit={handleSearch}
							className="h-full flex items-center gap-x-4"
						>
							{/* 戻るボタン */}
							<button
								type="button"
								className="flex-none"
								onClick={() => setIsSearchOpen(false)}
							>
								<IoMdClose className="text-white w-6 h-6" />
							</button>

							{/* 検索入力 */}
							<input
								ref={inputRef}
								type="text"
								value={query}
								onChange={e => setQuery(e.target.value)}
								placeholder="検索..."
								className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-base"
							/>

							{/* 検索ボタン */}
							<button type="submit" className="flex-none">
								<HiOutlineSearch className="text-white w-6 h-6" />
							</button>
						</form>
					</div>
				</div>

				{/* 検索結果エリア（必要に応じて実装） */}
				<div className="max-w-7xl mx-auto px-4 py-4">
					{/* ここに検索結果を表示 */}
				</div>
			</div>
		</>
	);
};

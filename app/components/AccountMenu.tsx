import { useRef, useState } from "react";
import { useSession } from "~/hooks/useSession";
import { ProfileForm } from "./ProfileForm";

export const AccountMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { session, loading } = useSession();
	const menuRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	// イベントリスナーの設定
	useState(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	});

	return (
		<div className="relative" ref={menuRef}>
			{loading ? (
				<div className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full animate-pulse bg-gray-300" />
				</div>
			) : session ? (
				<>
					<button
						type="button"
						className="btn btn-ghost btn-circle avatar"
						onClick={() => setIsOpen(!isOpen)}
					>
						<div className="w-10 rounded-full">
							<img
								src={session.user.image || ""}
								alt={session.user.name || "User Avatar"}
							/>
						</div>
					</button>
					<div
						className={`
							fixed top-[3.5rem] right-4 z-50
							menu bg-neutral-700 text-white rounded-box w-48 shadow-lg
							transform transition-all duration-200 origin-top-right
							${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
						`}
					>
						<ul className="p-2">
							<li>
								<button
									className="py-2 px-4 hover:bg-neutral-600 rounded-lg w-full text-left"
									onClick={() => {
										setIsProfileOpen(true);
										setIsOpen(false);
									}}
								>
									プロフィール
								</button>
							</li>
							<li
								hidden
								// まだ作られてない機能なので、非表示。
							>
								<button
									className="py-2 px-4 hover:bg-neutral-600 rounded-lg w-full text-left"
									onClick={() => setIsOpen(false)}
								>
									テーマ設定
								</button>
							</li>
							<li>
								<button
									className="py-2 px-4 hover:bg-neutral-600 rounded-lg w-full text-left"
									onClick={() => {
										window.location.href =
											"/api/auth/signout";
										setIsOpen(false);
									}}
								>
									ログアウト
								</button>
							</li>
						</ul>
					</div>
					<ProfileForm
						isOpen={isProfileOpen}
						onClose={() => setIsProfileOpen(false)}
					/>
				</>
			) : (
				<button
					className="h-10 flex items-center justify-center md:btn md:btn-primary md:normal-case md:gap-2 md:px-4"
					onClick={() => {
						window.location.href =
							"/api/auth/signin?provider=google";
					}}
				>
					<div className="w-8 h-8 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 48 48"
							aria-label="Google"
							className="w-6 h-6 md:w-4 md:h-4"
						>
							<title>Google Logo</title>
							<path
								fill="#FFC107"
								d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
							/>
							<path
								fill="#FF3D00"
								d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
							/>
							<path
								fill="#4CAF50"
								d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
							/>
							<path
								fill="#1976D2"
								d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
							/>
						</svg>
					</div>
					<span className="hidden md:inline text-base whitespace-nowrap">
						Googleでログイン
					</span>
				</button>
			)}
		</div>
	);
};

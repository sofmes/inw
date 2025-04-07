import { useState } from "react";
import { authClient } from "../lib/auth-client";

export const AccountMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleLogin = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/api/auth/callback/google",
		});
	};

	return (
		<div className="relative">
			<div className="dropdown dropdown-end">
				{/* ログインボタン */}
				<button
					type="button"
					className="btn btn-primary"
					onClick={handleLogin}
				>
					Googleでログイン
				</button>

				{/* メニュー - ログイン後に表示 */}
				<ul
					className={`menu menu-sm dropdown-content mt-3 p-2 shadow bg-neutral-700 text-white rounded-box w-48
            transform transition-all duration-300 ease-out
            ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
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

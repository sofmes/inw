import { useEffect, useState } from "react";

type User = {
	id: string;
	name: string | null;
	email: string | null;
	image: string | null;
	description?: string;
};

type Session = {
	user: User;
	expires: string;
};

type SessionResponse = {
	user?: {
		id?: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		description?: string;
	};
	expires?: string;
};

export function useSession() {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getSession() {
			try {
				const response = await fetch("/api/auth/session");
				if (!response.ok) {
					throw new Error("Failed to fetch session");
				}

				const data = (await response.json()) as SessionResponse;

				if (data?.user?.id) {
					setSession({
						user: {
							id: data.user.id,
							name: data.user.name || null,
							email: data.user.email || null,
							image: data.user.image || null,
							description: data.user.description || "",
						},
						expires: data.expires || "",
					});
				} else {
					console.error("セッションにユーザーIDが含まれていません");
					setSession(null);
				}
			} catch (error) {
				console.error("セッション取得エラー:", error);
				setSession(null);
			} finally {
				setLoading(false);
			}
		}

		getSession();

		// セッション状態の定期的な更新（オプション）
		const interval = setInterval(getSession, 5 * 60 * 1000); // 5分ごとに更新

		return () => clearInterval(interval);
	}, []);

	const refreshSession = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/auth/session");
			if (!response.ok) {
				throw new Error("Failed to fetch session");
			}

			const data = (await response.json()) as SessionResponse;

			if (data?.user?.id) {
				setSession({
					user: {
						id: data.user.id,
						name: data.user.name || null,
						email: data.user.email || null,
						image: data.user.image || null,
						description: data.user.description || "",
					},
					expires: data.expires || "",
				});
			} else {
				console.error("セッションにユーザーIDが含まれていません");
				setSession(null);
			}
		} catch (error) {
			console.error("セッション更新エラー:", error);
			setSession(null);
		} finally {
			setLoading(false);
		}
	};

	return {
		session,
		loading,
		refreshSession,
	};
}

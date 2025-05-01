import type React from "react";
import { Form } from "react-router";
import { useSession } from "~/hooks/useSession";
import { useUser } from "~/hooks/useUser";

interface ProfileFormProps {
	isOpen: boolean;
	onClose: () => void;
}

interface UserData {
	id: string;
	name: string;
	email: string;
	image?: string;
	description?: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
	isOpen,
	onClose,
}) => {
	const { session } = useSession();
	const { data: userData, mutate } = useUser();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!session?.user?.id) {
			console.error("ユーザーIDが見つかりません");
			alert("セッションが無効です。再度ログインしてください。");
			return;
		}

		console.log("セッションのユーザーID:", session.user.id);
		const formData = new FormData(e.currentTarget);
		const description = formData.get("description") as string;
		try {
			const response = await fetch(`/api/users/${session.user.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ description }),
			});

			if (!response.ok) {
				const errorData = (await response.json()) as { error?: string };
				console.error("Update failed:", errorData);
				throw new Error(
					`プロフィールの更新に失敗しました: ${errorData.error || "不明なエラー"}`,
				);
			}

			const result = await response.json();
			console.log("Update successful:", result);

			// ユーザーデータを更新
			if (userData) {
				mutate({
					...userData,
					description: (result as UserData).description,
				});
			}

			onClose();
		} catch (error) {
			console.error("Error updating profile:", error);
			alert(
				error instanceof Error
					? error.message
					: "プロフィールの更新に失敗しました",
			);
		}
	};

	if (!session?.user) {
		return null; // セッションがない場合は何も表示しない
	}

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50
        transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
		>
			<Form
				className={`bg-neutral-800 text-white p-4 sm:p-8 rounded-2xl shadow-lg w-[95%] sm:w-[600px] max-h-[90vh] overflow-y-auto
                            transform transition-transform duration-300 ${isOpen ? "scale-100" : "scale-90 opacity-0"}`}
				onSubmit={handleSubmit}
			>
				<h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
					プロフィール設定
				</h2>

				<div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
					<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden">
						<img
							src={userData?.image || session.user.image || ""}
							alt={
								userData?.name ||
								session.user.name ||
								"User Avatar"
							}
							className="w-full h-full object-cover"
						/>
					</div>
					<div>
						<p className="text-lg font-semibold">
							{userData?.name || session.user.name}
						</p>
						<p className="text-sm text-gray-400">
							{userData?.email || session.user.email}
						</p>
					</div>
				</div>

				<label
					htmlFor="description"
					className="block text-base sm:text-lg mb-2"
				>
					自己紹介
				</label>
				<textarea
					id="description"
					name="description"
					defaultValue={
						userData?.description || session.user.description || ""
					}
					className="w-full p-2 bg-neutral-700 rounded-lg mb-4 sm:mb-6 text-base sm:text-lg"
					rows={6}
					placeholder="自己紹介を入力してください"
				/>

				<div className="flex justify-end gap-3 sm:gap-4">
					<button
						type="button"
						onClick={onClose}
						className="bg-gray-600 px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg hover:bg-gray-500 transition"
					>
						キャンセル
					</button>
					<button
						type="submit"
						className="bg-blue-500 px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg hover:bg-blue-400 transition"
					>
						保存
					</button>
				</div>
			</Form>
		</div>
	);
};

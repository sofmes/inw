import type React from "react";
import { Form } from "react-router";
import { useUser } from "~/hooks/useUser";

interface IdeaFormProps {
	isOpen: boolean;
	onClose: () => void;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ isOpen, onClose }) => {
	const user = useUser();
	if (!user.data) return;

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50
        transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
		>
			<Form
				className={`bg-neutral-800 text-white p-4 sm:p-8 rounded-2xl shadow-lg w-[95%] sm:w-[600px] max-h-[90vh] overflow-y-auto
                            transform transition-transform duration-300 ${isOpen ? "scale-100" : "scale-90 opacity-0"}`}
				method="post"
			>
				<h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
					アイデア投稿
				</h2>

				<input name="userId" value={user.data.id} hidden />

				<label
					htmlFor="name"
					className="block text-base sm:text-lg mb-2"
				>
					タイトル
				</label>
				<input
					id="name"
					name="name"
					type="text"
					className="w-full p-2 bg-neutral-700 rounded-lg mb-4 text-base sm:text-lg"
					placeholder="アイデアのタイトルを入力"
				/>

				<label
					htmlFor="description"
					className="block text-base sm:text-lg mb-2"
				>
					説明
				</label>
				<textarea
					id="description"
					name="description"
					className="w-full p-2 bg-neutral-700 rounded-lg mb-4 text-base sm:text-lg"
					rows={4}
					placeholder="アイデアの説明を入力"
				/>

				<label
					htmlFor="tags"
					className="block text-base sm:text-lg mb-2"
				>
					タグ
				</label>
				<input
					id="tags"
					name="tags"
					type="text"
					className="w-full p-2 bg-neutral-700 rounded-lg mb-4 sm:mb-6 text-base sm:text-lg"
					placeholder="#タグを入力"
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
						onClick={onClose}
						className="bg-blue-500 px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg hover:bg-blue-400 transition"
					>
						投稿
					</button>
				</div>
			</Form>
		</div>
	);
};

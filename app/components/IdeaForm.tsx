import type React from "react";
import { Form, useActionData } from "react-router";

interface IdeaFormProps {
	isOpen: boolean;
	onClose: () => void;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ isOpen, onClose }) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50
        transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
		>
			<Form
				className={`bg-neutral-800 text-white p-8 rounded-2xl shadow-lg w-[600px]
                            transform transition-transform duration-300 ${isOpen ? "scale-100" : "scale-90 opacity-0"}`}
				method="post"
			>
				<h2 className="text-2xl font-bold mb-6">アイデア投稿</h2>

				<label htmlFor="name" className="block text-lg mb-2">
					タイトル
				</label>
				<input
					id="name"
					name="name"
					type="text"
					className="w-full p-2 bg-neutral-700 rounded-lg mb-4 text-lg"
					placeholder="アイデアのタイトルを入力"
				/>

				<label htmlFor="description" className="block text-lg mb-2">
					説明
				</label>
				<textarea
					id="description"
					name="description"
					className="w-full p-2 bg-neutral-700 rounded-lg mb-4 text-lg"
					rows={4}
					placeholder="アイデアの説明を入力"
				/>

				<label htmlFor="tags" className="block text-lg mb-2">
					タグ
				</label>
				<input
					id="tags"
					name="tags"
					type="text"
					className="w-full p-2 bg-neutral-700 rounded-lg mb-6 text-lg"
					placeholder="#タグを入力"
				/>

				<div className="flex justify-end gap-4">
					<button
						type="button"
						onClick={onClose}
						className="bg-gray-600 px-6 py-2 rounded-lg text-lg hover:bg-gray-500 transition"
					>
						キャンセル
					</button>
					<button
						type="submit"
						onClick={onClose}
						className="bg-blue-500 px-6 py-2 rounded-lg text-lg hover:bg-blue-400 transition"
					>
						投稿
					</button>
				</div>
			</Form>
		</div>
	);
};

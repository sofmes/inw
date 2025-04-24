import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { Idea } from "../../app/lib/model";
import { SelectedItemContext } from "./Context";

export function Drawer() {
	const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);

	return (
		<div
			id="drawer"
			className={`absolute top-0 left-0 z-20 h-screen w-[500px] pt-5 pl-10 rounded-r-2xl text-white bg-[rgb(43,43,43)]
				transform transition-transform duration-200 ease-in-out
				${selectedItem ? "translate-x-0" : "-translate-x-full"}`}
		>
			{selectedItem ? (
				<>
					<button
						onClick={() => setSelectedItem(null)}
						className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors duration-200"
					>
						<IoClose size={26} />
					</button>
					<h2 className="text-3xl mb-2">{selectedItem.label}</h2>
					{selectedItem instanceof Idea && (
						<>
							<div className="flex items-center">
								<div className="w-8 h-8 rounded-full flex items-center justify-center">
									<img
										src={
											selectedItem.author.iconUrl ??
											undefined
										}
										alt={selectedItem.author.name}
										className="w-full h-full object-cover"
									/>
								</div>
								<span className="text-lg">
									{selectedItem.author.name}
								</span>
							</div>
							<div className="mt-4 prose prose-invert overflow-y-auto max-h-[calc(100vh-170px)]">
								<div className="[&>*:last-child]:mb-20 [&>*:first-child]:mt-0">
									<ReactMarkdown>
										{selectedItem.description}
									</ReactMarkdown>
								</div>
							</div>
							<button
								hidden
								// ↑現在はまだ実装されていないプロジェクト機能のものなので非表示
								className="absolute bottom-7 right-7 px-6 py-2 rounded-lg
										bg-[rgb(84,84,84)] hover:bg-[rgb(100,100,100)]
										transition-colors duration-200"
							>
								採用する
							</button>
						</>
					)}
				</>
			) : null}
		</div>
	);
}

import { useEffect, useState } from 'react';
import { RootItemContext } from './components/Context.tsx';
import Header from './components/Header';
import { MindMap } from './components/MindMap';
import { Idea, type Nodeable, type Root, Tag } from './libs/model';

export function App() {
	//const root = new User('ユーザーテスト', 1);
	const root = new Tag('ブルーアーカイブ', 1);
	const [selectedItem, setSelectedItem] = useState<Nodeable | null>(null);
	const [rootItem, setRootItem] = useState<Root | null>(root);

	// 何かが選択された際にそれを検出できてるかを確かめるためのデバッグログ
	useEffect(() => {
		console.debug('アイテムが選択されました:', selectedItem);
	}, [selectedItem]);

	return (
		<div className='App'>
			<Header />
			<RootItemContext.Provider value={[rootItem, setRootItem]}>
				{rootItem ? (
					<MindMap
						root={rootItem}
						onSelect={setSelectedItem}
						ideas={[
							new Idea(
								'天使の輪っか 変える',
								1,
								[new Tag('天使', 2)],
								'天使の輪っかの説明',
							),
							new Idea('テスト2', 2, [], 'テスト2の説明'),
							new Idea('テスト3', 3, [], 'テスト3の説明'),
						]}
					/>
				) : null}
			</RootItemContext.Provider>
		</div>
	);
}

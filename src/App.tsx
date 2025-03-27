import { useState } from 'react';
import { RootItemContext, SelectedItemContext } from './components/Context.tsx';
import { Drawer } from './components/Drawer.tsx';
import { Header } from './components/Header.tsx';
import { MindMap } from './components/mindmap.tsx';
import { Idea, type Nodeable, type Root, Tag, User } from './libs/model';

export function App() {
	//const root = new User('ユーザーテスト', 1);
	const root = new Tag('ブルーアーカイブ', 1);
	const [selectedItem, setSelectedItem] = useState<Nodeable | null>(null);
	const [rootItem, setRootItem] = useState<Root | null>(root);

	const testUser = new User(
		'gaku sato',
		1,
		'https://lh3.googleusercontent.com/a/ACg8ocLuj4qT1J-p5BiCxXNefcJ9t6fBO7PyduCxUKB_4qtyXDXiUA=s128-b16-cc-rp-mo',
	);

	return (
		<div className='App'>
			<Header />
			<RootItemContext.Provider value={[rootItem, setRootItem]}>
				<SelectedItemContext.Provider
					value={[selectedItem, setSelectedItem]}
				>
					<Drawer />
				</SelectedItemContext.Provider>

				{rootItem ? (
					<MindMap
						root={rootItem}
						onSelect={setSelectedItem}
						ideas={[
							new Idea(
								'天使の輪っか 変える',
								1,
								[new Tag('天使', 2)],
								`## 概要
天使の輪っかのデザインを現代的なものに一新する提案です。

## 特徴
- シンプルで洗練されたデザイン
- 光の反射を活かした立体感
- 従来の神聖さを保ちながらモダンな要素を取り入れる

## イメージ参考
1. 細い金属リングによる繊細な表現
2. 光を取り入れた半透明な素材の使用
3. ミニマルなデザインアプローチ

## 期待される効果
- より現代的な印象を与える
- 若い世代への訴求力向上
- 制作コストの削減

> 💡 **ポイント**: 伝統と革新のバランスを重視`,
								testUser,
							),
							new Idea(
								'テスト2',
								2,
								[],
								'テスト2の説明',
								testUser,
							),
							new Idea(
								'テスト3',
								3,
								[],
								'テスト3の説明',
								testUser,
							),
						]}
					/>
				) : null}
			</RootItemContext.Provider>
		</div>
	);
}

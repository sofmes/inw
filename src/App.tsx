import Header from './components/Header';
import { MindMap } from './components/MindMap';
import { Idea, Tag, User } from './libs/model';

export function App() {
	//const root = new User('ユーザーテスト', 1);
	const root = new Tag('ブルーアーカイブ', 1);

	return (
		<div className='App'>
			<Header />
			<MindMap
				root={root}
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
		</div>
	);
}

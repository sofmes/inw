import * as d3 from 'd3';
import type React from 'react';
import { useEffect, useRef } from 'react';

import AddIdeaButton from './AddIdeaButton';

// NodeData 型
interface NodeData {
	x?: number;
	y?: number;
	name: string;
}

const MindMap: React.FC = () => {
	const mindMapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mindMapRef.current) return;

		const width = mindMapRef.current.clientWidth;
		const height = mindMapRef.current.clientHeight;

		// SVGの作成
		const svg = d3
			.select(mindMapRef.current)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background', 'black'); // ダークモード固定

		// ズームとパンの設定
		const zoom = d3
			.zoom<SVGSVGElement, unknown>()
			.scaleExtent([0.5, 2]) // ズーム範囲
			.on('zoom', event => {
				g.attr('transform', event.transform); // グループ全体をズーム・パン
			});

		svg.call(zoom);

		// グループを作成（ズーム・パンの対象）
		const g = svg.append('g');

		// メインノード（中央の大きな円）
		const mainNode: NodeData = {
			x: width / 2,
			y: height / 2,
			name: 'ブルアカ',
		};

		// 子ノード（5つの小さい円）
		const childNodes: NodeData[] = [
			{ x: width / 2, y: height / 2 - 100, name: 'ムツキ' },
			{ x: width / 2 + 100, y: height / 2, name: 'ミドリ' },
			{ x: width / 2 - 100, y: height / 2, name: 'モモイ' },
			{ x: width / 2 + 70, y: height / 2 + 100, name: 'アリス' },
			{ x: width / 2 - 70, y: height / 2 + 100, name: 'アル' },
		];

		// リンクデータ
		const links = childNodes.map(child => ({
			source: mainNode,
			target: child,
		}));

		// リンク（線）を描画
		g.selectAll('line')
			.data(links)
			.enter()
			.append('line')
			.attr('x1', d => d.source.x ?? 0)
			.attr('y1', d => d.source.y ?? 0)
			.attr('x2', d => d.target.x ?? 0)
			.attr('y2', d => d.target.y ?? 0)
			.attr('stroke', 'white')
			.attr('stroke-width', 1.5);

		// ノード（円）を描画
		const allNodes = [mainNode, ...childNodes];
		g.selectAll('circle')
			.data(allNodes)
			.enter()
			.append('circle')
			.attr('cx', d => d.x ?? 0)
			.attr('cy', d => d.y ?? 0)
			.attr('r', d => (d === mainNode ? 30 : 15))
			.attr('fill', 'lightblue'); // すべてのノードを水色に変更

		// ラベル（名前）を描画
		g.selectAll('text')
			.data(allNodes)
			.enter()
			.append('text')
			.attr('x', d => d.x ?? 0)
			.attr('y', d => (d.y ?? 0) - 20)
			.attr('text-anchor', 'middle')
			.attr('fill', 'white')
			.text(d => d.name);
	}, []);

	return (
		<div className='relative w-full h-screen'>
			<div ref={mindMapRef} style={{ width: '100%', height: '100vh' }} />
			<AddIdeaButton /> {/* 右下のボタンを追加 */}
		</div>
	);
};

export default MindMap;

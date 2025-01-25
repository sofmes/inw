// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './components/mindmap.css';  // mindmapのスタイルをインポート
import MindMap from './components/mindmap'; // MindMapコンポーネントをインポート


const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <MindMap /> {/* MindMapコンポーネントを表示 */}
  </StrictMode>
);

// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
<<<<<<< Updated upstream
import './components/Register.css';
import Register from './components/Register.tsx'; // Registerコンポーネントをインポート
import './globals.css';
=======
import './components/mindmap.css';  // mindmapのスタイルをインポート
import MindMap from './components/mindmap'; // MindMapコンポーネントをインポート
>>>>>>> Stashed changes

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <MindMap /> {/* MindMapコンポーネントを表示 */}
  </StrictMode>
);

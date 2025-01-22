








// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './components/Register.css';
import Register from './components/Register.tsx'; // Registerコンポーネントをインポート
import './globals.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Register /> {/* Registerコンポーネントを表示 */}
  </StrictMode>
);

// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login from './components/Login.tsx'; // ここでLogin.jsをインポート！

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Login /> {/* ここでLoginコンポーネントを表示 */}
  </StrictMode>
);

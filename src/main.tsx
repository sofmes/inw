// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './globals.css';
import './components/mindmap.css';
import { App } from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);

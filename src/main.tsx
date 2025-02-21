// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './globals.css';
import './components/mindmap.css';
import Header from './components/Header';
import MindMap from './components/mindmap';

const root = createRoot(document.getElementById('root')!);

root.render(
	<StrictMode>
		<Header />
		<MindMap />
	</StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListView from './views/list/index.jsx';
import UploadView from './views/upload/index.jsx';
import FallbackView from './views/fallback/index.jsx';

const router = createBrowserRouter([
	{
		path: '/documentos',
		element: <App />,
		children: [
			{
				path: '',
				element: <ListView />
			},
			{
				path: ':documentId',
				element: <UploadView />
			}
		]
	},
	{
		path: '*',
		element: <FallbackView />
	}
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);

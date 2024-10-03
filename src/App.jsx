import { Outlet } from 'react-router-dom';
import './App.css';
import H1 from './shared/components/H1';

function App() {
	return (
		<>
			<H1 className='text-3xl font-bold'>Gestión de documentos</H1>
			<Outlet />
		</>
	);
}

export default App;

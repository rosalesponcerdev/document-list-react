import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FallbackView() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/documentos');
	}, []);

	return <></>;
}

export default FallbackView;

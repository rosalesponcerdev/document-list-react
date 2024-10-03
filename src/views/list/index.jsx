import { useNavigate } from 'react-router-dom';
import List from '../../components/list';
import { useDocumentStore } from '../../store/document.store';
import NewDocumentButton from '../../shared/components/ReturnButton';

function ListView() {
	const navigate = useNavigate();
	const documents = useDocumentStore((state) => state.documents);
	const createNewDocumentHandler = useDocumentStore((state) => state.createNewDocument);

	return (
		<>
			<div className='flex justify-center my-10'>
				<NewDocumentButton onClick={() => createNewDocumentHandler(navigate)}>
					Agregar nuevo documento
				</NewDocumentButton>
			</div>
			<List documents={documents} />
		</>
	);
}

export default ListView;

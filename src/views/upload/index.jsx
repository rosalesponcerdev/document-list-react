import { Link, useNavigate, useParams } from 'react-router-dom';
import DropZone from '../../components/drop-zone';
import { useDocumentStore } from '../../store/document.store';
import { useEffect } from 'react';

function UploadView() {
	const navigate = useNavigate();
	const { documentId } = useParams();

	const editDocument = useDocumentStore((state) => state.editDocument);
	const removeFile = useDocumentStore((state) => state.removeFile);
	const currentDocument = useDocumentStore((state) => state.getSelectedDocument());

	const selectDocumentById = useDocumentStore((state) => state.selectDocumentById);

	useEffect(() => {
		const exist = selectDocumentById(documentId);

		if (!exist) navigate('/documentos');
	}, []);

	const uploadFileHandler = (newFile) => {
		editDocument(documentId, newFile);
	};

	const removeFileEmitHandler = () => {
		removeFile(documentId);
	};

	return currentDocument ? (
		<>
			<section>
				<div className='flex'>
					<Link
						to={'/documentos'}
						className='mb-4 px-4 py-2 bg-blue-500 rounded-md text-white font-medium active:shadow-md active:opacity-70'>
						Regresar a la lista
					</Link>
				</div>

				<div className='flex'>
					<span>
						<strong>Id: </strong>
						{currentDocument.id}
					</span>
				</div>
				<div className='flex'>
					<span>
						<strong>Titulo: </strong>
						{currentDocument.text}
					</span>
				</div>
				<div className='flex'>
					<span>
						<strong>Fecha: </strong> {currentDocument.date} {currentDocument.time}
					</span>
				</div>

				{currentDocument.file?.kbOriginal ? (
					<div className='flex'>
						<span>
							<strong>Tamaño original: </strong>{' '}
							{currentDocument.file.kbOriginal.toFixed(2)} KB
						</span>
					</div>
				) : null}

				{currentDocument.file?.kbOptimized ? (
					<div className='flex'>
						<span>
							<strong>Tamaño Optimizado: </strong>{' '}
							{currentDocument.file.kbOptimized.toFixed(2)} KB
						</span>
					</div>
				) : null}

				<article className='max-w-md m-auto'>
					<DropZone
						file={currentDocument.file}
						uploadFileHandler={uploadFileHandler}
						removeFileEmitHandler={removeFileEmitHandler}
					/>
				</article>
			</section>
		</>
	) : null;
}

export default UploadView;

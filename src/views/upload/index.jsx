import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import DropZone from '../../components/drop-zone';
import { useDocumentStore } from '../../store/document.store';

function UploadView() {
	const navigate = useNavigate();
	const { documentId } = useParams();

	const loading = useDocumentStore((state) => state.loading);
	const editDocument = useDocumentStore((state) => state.editDocument);
	const removeFile = useDocumentStore((state) => state.removeFile);
	const selectDocumentById = useDocumentStore((state) => state.selectDocumentById);
	const currentDocument = useDocumentStore((state) => state.getSelectedDocument());

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
						aria-disabled={loading}
						to={'/documentos'}
						className='mb-4 px-4 py-2 bg-blue-500 rounded-md text-white font-medium active:shadow-md active:opacity-70 aria-disabled:opacity-70 aria-disabled:pointer-events-none'>
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

				<article className='mt-4 max-w-md m-auto'>
					<DropZone
						initialFile={currentDocument.file}
						uploadFileHandler={uploadFileHandler}
						removeFileEmitHandler={removeFileEmitHandler}
					/>
				</article>
			</section>
		</>
	) : null;
}

export default UploadView;

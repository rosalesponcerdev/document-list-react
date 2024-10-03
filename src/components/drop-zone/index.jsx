import { useRef, useState } from 'react';
import { optimizePdf } from '../../services/optimize';
import UploadButton from '../../shared/components/UploadButton';
import H3 from '../../shared/components/H3';

function DropZone({
	file = null,
	uploadFileHandler = (_) => {},
	removeFileEmitHandler = (_) => {}
} = {}) {
	const [loading, setLoading] = useState(false);
	const [currentDragState, setCurrentDragState] = useState('DRAG_LEAVE');
	const [currentFile, setFile] = useState(file);

	const inputFile = useRef();

	const onDragOverHandler = (e) => {
		e.preventDefault();
		setCurrentDragState('DRAG_OVER');
	};

	const onDragLeaveHandler = () => {
		setCurrentDragState('DRAG_LEAVE');
	};

	const getRandomFileId = () => Math.floor(Math.random() * 10000000).toString(16);

	const processFile = async (files) => {
		const file = files[0];

		if (file.type !== 'application/pdf') return;

		setLoading(true);

		const res = await optimizePdf(file);
		const urlData = URL.createObjectURL(res);

		const newFile = {
			urlData,
			kbOriginal: file.size / 1024,
			kbOptimized: res.size / 1024,
			id: getRandomFileId(),
			source: res,
			name: file.name
		};

		uploadFileHandler(newFile);
		setFile(newFile);

		inputFile.current.value = '';
		setLoading(false);
	};

	const onDropHandler = (e) => {
		e.preventDefault();

		setCurrentDragState('DROP');

		processFile([...e.dataTransfer.files]);
	};

	const changeInputFile = (e) => {
		console.log('changeInputFile', e);

		processFile([...e.target.files]);
	};

	const getDropZoneStyle = () => {
		if (currentDragState === 'DRAG_OVER') return 'border';

		return 'border-dashed';
	};

	const removeFileHandler = () => {
		removeFileEmitHandler(currentFile);
		setFile(null);
	};

	return (
		<div
			className={`border-2 border-green-600 rounded-lg p-8 ${getDropZoneStyle()} ${
				loading ? 'opacity-40 pointer-events-none' : null
			}`}
			onDragOver={onDragOverHandler}
			onDragLeave={onDragLeaveHandler}
			onDrop={onDropHandler}>
			<H3 className='font-semibold my-3 pointer-events-none'>Documentos</H3>

			<input type='file' className='hidden' onChange={changeInputFile} ref={inputFile} />

			<UploadButton
				disabled={currentDragState === 'DRAG_OVER'}
				className={`${
					currentDragState === 'DRAG_OVER' ? 'pointer-events-none' : ''
				} px-4 py-2 m-auto text-green-600 border-green-600 border-2 rounded-md font-medium active:shadow-md active:opacity-70 flex gap-2 disabled:opacity-30`}
				onClick={() => inputFile.current?.click()}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='size-6'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
					/>
				</svg>{' '}
				Subir archivo
			</UploadButton>

			{currentFile ? (
				<>
					<hr className='my-8 pointer-events-none' />
					<div className='flex gap-2 items-center pointer-events-none'>
						<a
							target='_blank'
							href={currentFile.urlData}
							className={`${
								currentDragState === 'DRAG_OVER'
									? 'pointer-events-none'
									: 'pointer-events-auto'
							}`}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-8 text-green-600'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
								/>
							</svg>
						</a>

						<div className='text-xs text-start font-semibold'>
							<p>{currentFile.name}</p>
							<p>{currentFile.kbOriginal?.toFixed(2)}KB</p>
						</div>

						<button
							onClick={removeFileHandler}
							disabled={currentDragState === 'DRAG_OVER'}
							className={`ml-auto ${
								currentDragState === 'DRAG_OVER'
									? 'pointer-events-none opacity-30'
									: 'pointer-events-auto'
							}`}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-7'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
								/>
							</svg>
						</button>
					</div>
				</>
			) : null}
		</div>
	);
}

export default DropZone;

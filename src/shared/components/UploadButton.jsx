import styled from 'styled-components';

const UploadButton = styled.button`
	padding: 0.5rem 1rem;
	margin: auto;
	color: #38a169;
	border: 2px solid #38a169;
	border-radius: 0.375rem;
	font-weight: 500;
	display: flex;
	gap: 0.5rem;

	&:active {
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		opacity: 0.7;
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

export default UploadButton;

import styled from 'styled-components';

const NewDocumentButton = styled.button`
	padding: 0.5rem 1rem; /* px-4 py-2 */
	background-color: #4299e1; /* bg-blue-500 */
	border-radius: 0.375rem; /* rounded-md */
	color: #fff; /* text-white */
	font-weight: 500; /* font-medium */

	&:active {
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* active:shadow-md */
		opacity: 0.7; /* active:opacity-70 */
	}
`;

export default NewDocumentButton;

import { string } from 'prop-types';
import { Link } from 'react-router-dom';

function ItemList({ id = '', text = '' } = {}) {
	return (
		<li className='flex'>
			<Link
				to={`/documentos/${id}`}
				className='cursor-pointer select-none text-blue-500 font-semibold hover:underline'>
				{text}
			</Link>
		</li>
	);
}

ItemList.propTypes = {
	text: string,
	id: string
};

export default ItemList;

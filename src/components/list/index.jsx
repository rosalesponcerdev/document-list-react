import { array } from 'prop-types';
import ItemList from '../item-list';

function List({ documents = [] } = {}) {
	return (
		<>
			{documents.map((documentItem) => (
				<ul key={documentItem.id}>
					<ItemList text={documentItem.text} id={documentItem.id} />
				</ul>
			))}
		</>
	);
}

List.propTypes = {
	documents: array
};

export default List;

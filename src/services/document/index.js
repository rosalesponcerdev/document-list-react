import { dateFormat, timeFormat } from '../../core/timer-format';

export const createNewDocumentObj = () => {
	const id = crypto.randomUUID();
	const text = 'New Document';
	const dateObject = new Date();

	const time = timeFormat.format(dateObject);
	const date = dateFormat.format(dateObject);

	return { id, text, time, date };
};

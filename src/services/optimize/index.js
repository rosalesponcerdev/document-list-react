export const optimizePdf = async (file) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append('Accept', 'application/json');
		myHeaders.append('Api-Key', import.meta.env.VITE_API_KEY);

		const formdata = new FormData();
		formdata.append('file', file, file.name);
		formdata.append('compression_level', 'medium');

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: formdata,
			redirect: 'follow'
		};

		const response = await fetch(import.meta.env.VITE_URL, requestOptions);
		const data = await response.json();

		const fileResponse = await fetch(data.outputUrl);
		const blob = await fileResponse.blob();

		const newFile = new File([blob], file.name, { type: file.type });

		return newFile;
	} catch (error) {
		console.warn(error);

		return file;
	}
};

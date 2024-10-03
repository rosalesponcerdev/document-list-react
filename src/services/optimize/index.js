export const optimizePdf = async (file) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append('Accept', 'application/json');
		myHeaders.append('Api-Key', '559fae7a-4053-44ff-978f-c0c5fa7abcc1');

		const formdata = new FormData();
		formdata.append('file', file, file.name);
		formdata.append('compression_level', 'medium');

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: formdata,
			redirect: 'follow'
		};

		const response = await fetch('https://api.pdfrest.com/compressed-pdf', requestOptions);
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
